import { View } from '@defaults';
import { Button, TextInput } from 'react-native';
import { useRoot } from '@hooks';
import { useState } from 'react';
import { LoginDtoType } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../../type';

export const LoginScreen = () => {
  const { login } = useRoot();
  const [loginDto, setLoginDto] = useState<LoginDtoType>({
    email: '',
    password: '',
  });
  const { navigate } = useNavigation<AuthNavigationType>();

  return (
    <View flex center>
      <TextInput
        value={loginDto.email}
        placeholder="Email"
        onChangeText={text => setLoginDto({ ...loginDto, email: text })}
        autoCapitalize="none"
      />
      <TextInput
        value={loginDto.password}
        placeholder="Password"
        onChangeText={text => setLoginDto({ ...loginDto, password: text })}
        autoCapitalize="none"
      />
      <Button
        title="Login"
        onPress={() => {
          login(loginDto);
        }}
      />
      <Button
        title="Signup?"
        onPress={() => {
          navigate('RegisterScreen');
        }}
      />
    </View>
  );
};
