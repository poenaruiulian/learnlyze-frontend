import { View, Text } from '@defaults';
import { Button } from 'react-native';
import { useRoot } from '@hooks';

export const HomeScreen = () => {
  const { toggleIsLogged } = useRoot();

  return (
    <View flex center>
      <Text>Home</Text>
      <Button title="Log out" onPress={toggleIsLogged} />
    </View>
  );
};
