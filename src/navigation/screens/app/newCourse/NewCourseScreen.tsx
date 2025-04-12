import { KBackButton, KContainer, KSpacer } from '@components';
import { sizes, strings } from '@constants';
import { Text, View } from '@defaults';
import { useCourse, useRoot } from '@hooks';
import { images } from '@images';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { AppNavigationType } from '../../../type';
import { KLoadingCourse, KTextInput } from './components';

export const NewCourseScreen = () => {
  const { isNewUser, setIsNewUser } = useRoot();
  const { generateNewCourse } = useCourse();

  const { reset } = useNavigation<AppNavigationType>();

  const [isLoading, setIsLoading] = useState(false);

  const handleNewCourseGeneration = useCallback(
    (description: string) => {
      setIsLoading(true);
      generateNewCourse(description).then(fullCourse => {
        setIsLoading(false);

        if (!fullCourse) {
          return;
        }

        setIsNewUser(false);
        reset({
          index: 0,
          routes: [
            { name: 'Tab' },
            { name: 'CourseScreen', params: { fullCourse } },
          ],
        });
      });
    },
    [generateNewCourse, reset, setIsNewUser]
  );

  return (
    <KContainer
      isScrollable={false}
      backgroundImage={images.newCourseBackground}>
      {!isNewUser && <KBackButton />}
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
