import { Text, View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { CourseModel, sizes, strings } from '@constants';
import { useCourse, useRoot } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { KTextInput } from './components';
import { AppNavigationType } from '../../../type';

export const NewCourseScreen = () => {
  const { isNewUser, setIsNewUser } = useRoot();
  const { generateNewCourse } = useCourse();
  const { navigate } = useNavigation<AppNavigationType>();

  const handleNewCourseGeneration = (description: string) => {
    generateNewCourse({ variables: { description } }).then(({ data }) => {
      setIsNewUser(false);

      const { generateCourse } = data;
      const { details, steps } = generateCourse;

      const course: CourseModel = { details, steps };

      navigate('CourseScreen', { course });
    });
  };

  return (
    <KContainer
      isScrollable={false}
      backgroundImage={images.newCourseBackground}>
      <KSpacer h={sizes.s40} />
      <Text white80 headingL semiBold center>
        {strings.addNewCourse.title}
      </Text>
      <KSpacer />
      <Text
        white50
        body
        semiBold
        center
        style={{ paddingHorizontal: sizes.s50 }}>
        {isNewUser
          ? strings.addNewCourse.firstCourseDescription
          : strings.addNewCourse.generalDescription}
      </Text>
      <View flex bottomV>
        <KTextInput onGenerateCourse={handleNewCourseGeneration} />
      </View>
    </KContainer>
  );
};
