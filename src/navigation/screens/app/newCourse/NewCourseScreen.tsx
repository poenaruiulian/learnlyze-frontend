import { Text, View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { sizes, strings } from '@constants';
import { useRoot } from '@hooks';
import { KTextInput } from './components';

export const NewCourseScreen = () => {
  const { isNewUser } = useRoot();

  const handleNewCourseGeneration = (newCourseDescription: string) => {
    console.log(newCourseDescription);

    // TODO Set new user boolean to false after generating the first course
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
