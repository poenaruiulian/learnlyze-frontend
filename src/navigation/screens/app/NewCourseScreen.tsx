import { Text, View } from '@defaults';
import { useRoot } from '@hooks';
import { Button } from 'react-native';

export const NewCourseScreen = () => {
  const { logout } = useRoot();
  return (
    <View flex center>
      <Text>New course</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};
