import { Button, Text, View } from '@defaults';
import { useRoot } from '@hooks';
import { useState } from 'react';
import {
  colors,
  LoginDtoType,
  sizes,
  strings,
  verifyEmail,
  verifyPassword,
} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { KContainer, KSpacer, KTextInput } from '@components';
import { TouchableOpacity } from 'react-native';
import { images } from '@images';
import { AuthNavigationType } from '../../type';

export const LoginScreen = () => {
  const { login } = useRoot();
  const [loginDto, setLoginDto] = useState<LoginDtoType>({
    email: '',
    password: '',
  });
  const { navigate } = useNavigation<AuthNavigationType>();

  return (
    <KContainer isScrollable={false} backgroundImage={images.authBackground}>
      <View centerH>
        <KSpacer h={30} />
        <Text
          headingXL
          center
          semiBold
          white80
          style={{ lineHeight: sizes.s48 }}>
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
      </View>
      <View flex centerH bottomV bottom={sizes.s40}>
        <Text headingL bold tulipTree>
          {strings.auth.login.title}
        </Text>
        <KSpacer h={sizes.s20} />
        <KTextInput
          placeholder={strings.inputPlaceholder.email}
          value={loginDto.email}
          onSetValue={email => setLoginDto({ ...loginDto, email })}
          error={
            !verifyEmail(loginDto.email)
              ? strings.inputWarnings.invalidEmail
              : undefined
          }
        />
        <KSpacer />
        <KTextInput
          placeholder={strings.inputPlaceholder.password}
          value={loginDto.password}
          onSetValue={text => setLoginDto({ ...loginDto, password: text })}
          error={
            !verifyPassword(loginDto.password)
              ? strings.inputWarnings.invalidPassword
              : undefined
          }
          isPassword
        />
        <KSpacer h={sizes.s20} />
        <Button
          title={strings.auth.login.title}
          onPress={() => {
            login(loginDto);
          }}
          titleStyle={{
            color: colors.white80,
          }}
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
