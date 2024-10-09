import { View, Text, Button } from '@defaults';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { KContainer, KSpacer } from '@components';
import { sizes } from '@constants';

type KCarouselPageOnboardingScreenType = {
  title: string;
  description?: string;
  buttonTitle?: string;
  onPress?: () => void;
  image: ImageSource;
};
export const KCarouselPageOnboardingScreen = ({
  ...props
}: KCarouselPageOnboardingScreenType) => (
  <KContainer backgroundImage={props.image} isScrollable={false}>
    <View flex bottomV centerH marginB={sizes.s20}>
      <View marginH={sizes.s20}>
        <Text heading bold center tulipTree>
          {props.title}
        </Text>
      </View>
      <KSpacer />
      <View marginH={sizes.s40}>
        <Text bodyM white50 center>
          {props.description}
        </Text>
      </View>
      {props.buttonTitle && props.onPress && (
        <View>
          <Button title={props.buttonTitle} onPress={props.onPress} />
        </View>
      )}
    </View>
  </KContainer>
);
