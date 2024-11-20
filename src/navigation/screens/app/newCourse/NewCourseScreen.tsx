import { Text, View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { sizes, strings } from '@constants';
import { KTextInput } from './components';

export const NewCourseScreen = () => {
  const handleNewCourseGeneration = (newCourseDescription: string) => {
    console.log(newCourseDescription);
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
        {strings.addNewCourse.description}
      </Text>
      <View flex bottomV>
        <KTextInput onGenerateCourse={handleNewCourseGeneration} />
      </View>
    </KContainer>
  );
};
