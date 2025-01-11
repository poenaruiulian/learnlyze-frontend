import { Text, View } from '@defaults';
import { KContainer } from '@components';
import { images } from '@images';

export const ProfileScreen = () => (
  <KContainer backgroundImage={images.mainBackground}>
    <View flex center>
      <Text>Profile</Text>
    </View>
  </KContainer>
);
