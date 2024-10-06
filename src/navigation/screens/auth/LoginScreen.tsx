import { Text, View } from '@defaults';
import { Button } from 'react-native';
import { useRoot } from '@hooks';

export const LoginScreen = () => {
  const { toggleIsLogged } = useRoot();

  return (
    <View flex center>
      <Text>Login</Text>
      <Button title="Login" onPress={toggleIsLogged} />
    </View>
  );
};
