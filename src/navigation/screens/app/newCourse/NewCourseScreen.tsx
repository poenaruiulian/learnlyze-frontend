import { Text, View } from '@defaults';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { sizes, strings } from '@constants';
import { useCourse, useRoot } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { KTextInput, KLoadingCourse } from './components';
import { AppNavigationType } from '../../../type';

export const NewCourseScreen = () => {
  const { isNewUser, setIsNewUser } = useRoot();
  const { generateNewCourse } = useCourse();

  const { reset } = useNavigation<AppNavigationType>();

  const [isLoading, setIsLoading] = useState(false);

  const handleNewCourseGeneration = (description: string) => {
    setIsLoading(true);
    generateNewCourse(description).then(fullCourse => {
      setIsNewUser(false);
      setIsLoading(false);
      reset({
        index: 0,
        routes: [
          { name: 'Tab' },
          { name: 'CourseScreen', params: { fullCourse } },
        ],
      });
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
      {isLoading && <KLoadingCourse />}
    </KContainer>
  );
};
