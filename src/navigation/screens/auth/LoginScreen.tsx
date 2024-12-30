import { Button, Text, View } from '@defaults';
import { useRoot } from '@hooks';
import { useRef, useState } from 'react';
import { colors, LoginDtoType, sizes, strings } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { KContainer, KSpacer, KTextInput } from '@components';
import { TextInput, TouchableOpacity } from 'react-native';
import { images } from '@images';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { AuthNavigationType } from '../../type';

export const LoginScreen = () => {
  const { navigate } = useNavigation<AuthNavigationType>();

  const { login, setIsNewUser } = useRoot();

  const passwordRef = useRef<TextInput>(null);

  const [loginDto, setLoginDto] = useState<LoginDtoType>({
    email: '',
    password: '',
  });

  return (
    <KContainer isScrollable={false} backgroundImage={images.authBackground}>
      <KSpacer h={30} />
      <Text headingXL center semiBold white80 style={{ lineHeight: sizes.s48 }}>
        {strings.auth.title}
      </Text>
      <KSpacer />
      <Text
        bodyM
        center
        semiBold
        white50
        style={{ paddingHorizontal: sizes.s60 }}>
        {strings.auth.description}
      </Text>
      <View flex centerH bottomV>
        <Text headingL bold tulipTree>
          {strings.auth.login.title}
        </Text>
        <KSpacer h={sizes.s20} />
        <KTextInput
          placeholder={strings.inputPlaceholder.email}
          value={loginDto.email}
          onSetValue={email => setLoginDto({ ...loginDto, email })}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          returnKey="next"
        />
        <KSpacer />
        <KTextInput
          innerRef={passwordRef}
          placeholder={strings.inputPlaceholder.password}
          value={loginDto.password}
          onSetValue={password => setLoginDto({ ...loginDto, password })}
          isPassword
          returnKey="done"
        />
        <KSpacer h={sizes.s20} />
        <Button
          title={strings.auth.buttonTitle}
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Medium).then(() => {
              setIsNewUser(false);
              login(loginDto).then();
            });
          }}
          titleStyle={{
            color: colors.white80,
          }}
          disabled={
            !(loginDto.email.length > 0 && loginDto.password.length > 0)
          }
        />
        <KSpacer h={sizes.s20} />
        <View row gap={4}>
          <Text bodyL white50 semiBold>
            {strings.auth.login.redirect}
          </Text>
          <TouchableOpacity onPress={() => navigate('RegisterScreen')}>
            <Text bodyL tulipTree80 semiBold>
              {strings.auth.register.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KContainer>
  );
};
