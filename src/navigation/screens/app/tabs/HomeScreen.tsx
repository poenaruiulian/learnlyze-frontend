import { View, Text } from '@defaults';
import { Button } from 'react-native';
import { useRoot, useUser } from '@hooks';

export const HomeScreen = () => {
  const { logout } = useRoot();
  const { user } = useUser();

  return (
    <View flex center>
      <Text>{user?.email}</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
};
