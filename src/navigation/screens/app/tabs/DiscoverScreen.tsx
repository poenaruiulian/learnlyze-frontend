import { Text, View } from '@defaults';
import { KContainer } from '@components';
import { images } from '@images';

export const DiscoverScreen = () => (
  <KContainer backgroundImage={images.mainBackground}>
    <View flex center>
      <Text>Discover</Text>
    </View>
  </KContainer>
);
