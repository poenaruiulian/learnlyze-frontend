import { Button, View } from '@defaults';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import { useEffect, useState } from 'react';
import { colors, sizes } from '@constants';
import { useWindowDimensions } from 'react-native';
import { useCourse, useStep, useResource } from '@hooks';
import { AppStackParamList } from '../../../type';
import { KHeader, KStepSet } from './components';

export const CourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();
  const { goBack } = useNavigation();

  const { width } = useWindowDimensions();

  const { getCourseById, accessCourse } = useCourse();

  const { replaceResource } = useResource();

  const { changeStepState, breakStep } = useStep();

  const [fullCourse, setFullCourse] = useState(params.fullCourse);

  useEffect(() => {
    accessCourse({ courseId: fullCourse.details.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCourseById(fullCourse.details.id).then(response => {
      if (!response) {
        goBack();
        return;
      }

      setFullCourse(response);
    });
    // eslint-disable-next-line
  }, [changeStepState, replaceResource, breakStep]);

  const isCoursePublishable =
    fullCourse.details.completedSteps === fullCourse.steps?.length;

  return (
    <KContainer
      backgroundColor={colors.tundora}
      isScrollable
      hasTopInsets={false}>
      <KHeader
        title={fullCourse.details.title}
        date={fullCourse.details.startedAt}
      />
      <KSpacer h={sizes.s30} />
      <View flex center>
        <KStepSet
          fullCourse={fullCourse}
          steps={fullCourse.steps}
          width={width}
        />
      </View>
      {isCoursePublishable && (
        <>
          <KSpacer />
          <View width={width} center>
            <Button title="Publish course" onPress={() => {}} center />
          </View>
        </>
      )}
      <KSpacer h={sizes.s50} />
    </KContainer>
  );
};
