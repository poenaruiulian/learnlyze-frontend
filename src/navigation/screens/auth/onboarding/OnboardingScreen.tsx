import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '@images';
import { colors, strings } from '@constants';
import { View } from '@defaults';
import { KCarouselPageOnboardingScreen } from './components';

export const OnboardingScreen = () => {
  const { width, height } = useWindowDimensions();

  const data = [
    {
      title: strings.onboarding.firstSlide.title,
      description: strings.onboarding.firstSlide.description,
      image: images.onboardingFirstSlideBg,
    },
    {
      title: strings.onboarding.secondSlide.title,
      description: strings.onboarding.secondSlide.description,
      image: images.onboardingSecondSlideBg,
    },
    {
      title: strings.onboarding.thirdSlide.title,
      buttonTitle: strings.onboarding.thirdSlide.buttonTitle,
      image: images.onboardingThirdSlideBg,
    },
  ];

  return (
    <View flex>
      <Carousel
        width={width}
        height={height}
        loop={false}
        data={data}
        overscrollEnabled={false}
        style={{ backgroundColor: colors.bunker }}
        renderItem={({ index }) => (
          <KCarouselPageOnboardingScreen {...data[index]} />
        )}
      />
    </View>
  );
};
