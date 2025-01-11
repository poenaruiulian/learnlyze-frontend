import { Text, View } from '@defaults';
import { KContainer } from '@components';
import { images } from '@images';
import { Button } from 'react-native';
import { useRoot, useUser } from '@hooks';

export const ProfileScreen = () => {
  const { logout } = useRoot();
  const { user } = useUser();

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <View flex center>
        <Text>Profile</Text>
        <Text>{user?.email}</Text>
        <Button title="Log out" onPress={logout} />
      </View>
    </KContainer>
  );
};
