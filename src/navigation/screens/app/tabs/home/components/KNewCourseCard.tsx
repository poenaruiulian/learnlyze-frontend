import { colors, sizes, strings } from '@constants';
import { Text } from '@defaults';
import { images } from '@images';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { AppNavigationType } from '../../../../../type';

export const KNewCourseCard = () => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<AppNavigationType>();

  const handleNavigation = () => navigate('NewCourseScreen');

  return (
    <ImageBackground
      source={images.newCourseCardBackground}
      style={{
        alignSelf: 'center',
        width: width - sizes.s32,
        height: (width - sizes.s32) / 2.4,
      }}
      resizeMode="cover">
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: sizes.s14,
          backgroundColor: colors.biscay60,
          borderRadius: 10,
        }}
        onPress={handleNavigation}>
        <Text bodyXL semiBold white style={{ width: '70%' }}>
          {strings.home.newCourseTitle}
        </Text>
        <Text body medium white50 style={{ width: '70%' }}>
          {strings.home.newCourseDescription}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
