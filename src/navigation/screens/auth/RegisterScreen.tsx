import { Button, Text, View } from '@defaults';
import { useState } from 'react';
import {
  generateSecurityCode,
  RegisterDtoType,
  sendEmail,
  sizes,
  strings,
  verifyEmail,
  verifyPassword,
} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { KContainer, KSpacer, KTextInput } from '@components';
import { images } from '@images';
import { TouchableOpacity } from 'react-native';
import { AuthNavigationType } from '../../type';

export const RegisterScreen = () => {
  const [registerDto, setRegisterDto] = useState<RegisterDtoType>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
      <View flex centerH bottomV>
        <Text headingL bold tulipTree>
          {strings.auth.register.title}
        </Text>
        <KSpacer h={sizes.s20} />
        <KTextInput
          value={registerDto.email}
          placeholder={strings.inputPlaceholder.email}
          onSetValue={text => setRegisterDto({ ...registerDto, email: text })}
        />
        <KSpacer h={5} />
        <KTextInput
          value={registerDto.lastName}
          placeholder={strings.inputPlaceholder.lastName}
          onSetValue={text =>
            setRegisterDto({ ...registerDto, lastName: text })
          }
        />
        <KSpacer h={5} />
        <KTextInput
          value={registerDto.firstName}
          placeholder={strings.inputPlaceholder.firstName}
          onSetValue={text =>
            setRegisterDto({ ...registerDto, firstName: text })
          }
        />
        <KSpacer h={5} />
        <KTextInput
          value={registerDto.password}
          placeholder={strings.inputPlaceholder.password}
          onSetValue={text =>
            setRegisterDto({ ...registerDto, password: text })
          }
          isPassword
        />
        <KSpacer h={sizes.s20} />
        <Button
          title={strings.auth.register.title}
          onPress={() => {
            const isEmailValid = verifyEmail(registerDto.email);
            const isPasswordValid = verifyPassword(registerDto.password);
            if (!isEmailValid) {
              console.log(strings.inputWarnings.invalidEmail);
            } else if (!isPasswordValid) {
              console.log(strings.inputWarnings.invalidPassword);
            } else {
              const code = generateSecurityCode;
              sendEmail({ email: registerDto.email, code }).then(() => {
                navigate('ConfirmMailScreen', {
                  registerDto,
                  code,
                });
              });
            }
          }}
        />
        <KSpacer h={sizes.s20} />
        <View row gap={4}>
          <Text bodyL white50 semiBold>
            {strings.auth.register.redirect}
          </Text>
          <TouchableOpacity onPress={() => navigate('LoginScreen')}>
            <Text bodyL tulipTree80 semiBold>
              {strings.auth.register.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KContainer>
  );
};
