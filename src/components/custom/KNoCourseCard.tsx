import {
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Text, View } from '@defaults';
import { images } from '@images';
import { colors, CoursesListsEnum, sizes, strings } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { useCourse } from '@hooks';
import { AppNavigationType, TabNavigationType } from '../../navigation/type';
import { KSpacer } from './KSpacer';

type CourseCardProps = {
  type: CoursesListsEnum;
};

export const KNoCourseCard = ({ ...props }: CourseCardProps) => {
  const { width } = useWindowDimensions();
  const { navigate: tabNavigate } = useNavigation<TabNavigationType>();
  const { navigate: appNavigation } = useNavigation<AppNavigationType>();
  const { courses, getCourseById } = useCourse();

  const handleDiscoverNavigation = () => tabNavigate('DiscoverScreen');

  const handleNewCourseNavigation = () => appNavigation('NewCourseScreen');

  const handleNoCourseCompletedPress = () => {
    if (courses.length === 0) {
      tabNavigate('ProfileScreen');
    } else {
      getCourseById(courses[0].id).then(
        fullCourse =>
          fullCourse && appNavigation('CourseScreen', { fullCourse })
      );
    }
  };

  const onPress =
    CoursesListsEnum.courses === props.type
      ? handleNewCourseNavigation
      : CoursesListsEnum.community === props.type
        ? handleDiscoverNavigation
        : handleNoCourseCompletedPress;

  const title =
    CoursesListsEnum.courses === props.type
      ? strings.home.noCoursesTitle
      : CoursesListsEnum.community === props.type
        ? strings.home.noCommunityTitle
        : CoursesListsEnum.top === props.type
          ? strings.home.noTopTitle
          : strings.home.noCompletedTitle;

  const description =
    CoursesListsEnum.courses === props.type
      ? strings.home.noCoursesDescription
      : CoursesListsEnum.community === props.type
        ? strings.home.noCommunityDescription
        : CoursesListsEnum.top === props.type
          ? strings.home.noTopDescription
          : strings.home.noCompletedDescription;

  return (
    <ImageBackground
      source={images.noCoursesCardBackground}
      resizeMode="cover"
      imageStyle={{
        borderRadius: sizes.s10,
      }}
      style={{
        width: width - sizes.s32,
        height: 130,
      }}>
      <TouchableOpacity
        disabled={CoursesListsEnum.top === props.type}
        style={{ flex: 1 }}
        onPress={onPress}>
        <View
          flex
          borderRadius={sizes.s10}
          padding={sizes.s10}
          style={{
            backgroundColor: colors.biscay60,
          }}>
          <Text bodyL bold white>
            {title}
          </Text>
          <KSpacer h={5} />
          <Text bodyXS white50 medium>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};
