import { View } from '@defaults';
import { useState } from 'react';
import {
  generateSecurityCode,
  RegisterDtoType,
  sendEmail,
  verifyEmail,
  verifyPassword,
} from '@constants';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native';
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
    <View flex center>
      <TextInput
        value={registerDto.email}
        placeholder="Email"
        onChangeText={text => setRegisterDto({ ...registerDto, email: text })}
        autoCapitalize="none"
      />
      <TextInput
        value={registerDto.lastName}
        placeholder="Last name"
        onChangeText={text =>
          setRegisterDto({ ...registerDto, lastName: text })
        }
        autoCapitalize="none"
      />
      <TextInput
        value={registerDto.firstName}
        placeholder="First name"
        onChangeText={text =>
          setRegisterDto({ ...registerDto, firstName: text })
        }
        autoCapitalize="none"
      />
      <TextInput
        value={registerDto.password}
        placeholder="Password"
        onChangeText={text =>
          setRegisterDto({ ...registerDto, password: text })
        }
        autoCapitalize="none"
      />
      <Button
        title="Register"
        onPress={() => {
          const isEmailValid = verifyEmail(registerDto.email);
          const isPasswordValid = verifyPassword(registerDto.password);
          if (!isEmailValid) {
            console.log('Email not valid');
          } else if (!isPasswordValid) {
            console.log('Password not valid');
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
      <Button
        title="Login?"
        onPress={() => {
          navigate('LoginScreen');
        }}
      />
    </View>
  );
};
