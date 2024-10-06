import { Text, View } from '@defaults';
import { Button, TextInput } from 'react-native';
import { useRoot } from '@hooks';
import { useState } from 'react';
import { LoginDtoType } from '@constants';

export const LoginScreen = () => {
  const { toggleIsLogged, setToken, login } = useRoot();
  const [loginDto, setLoginDto] = useState<LoginDtoType>({
    email: '',
    password: '',
  });

  return (
    <View flex center>
      <Text>Login</Text>
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
          login(loginDto).then(token => {
            if (token) {
              setToken(token);
              toggleIsLogged();
            } else {
              throw Error('Login failed due to invalid token.');
            }
          });
        }}
      />
    </View>
  );
};
