import { Button, View } from '@defaults';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import { useEffect, useState } from 'react';
import { colors, sizes } from '@constants';
import { useWindowDimensions } from 'react-native';
import { useCourse, useStep, useResource } from '@hooks';
import { AppNavigationType, AppStackParamList } from '../../../type';
import { KHeader, KPublishCourseModal, KStepSet } from './components';

export const CourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();
  const { goBack, navigate } = useNavigation<AppNavigationType>();

  const { width } = useWindowDimensions();

  const { getCourseById, accessCourse, completeCourse, publishCourse } =
    useCourse();

  const { replaceResource } = useResource();

  const { changeStepState, breakStep } = useStep();

  const [fullCourse, setFullCourse] = useState(params.fullCourse);
  const [isVisible, setIsVisible] = useState(false);

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
  }, [
    changeStepState,
    replaceResource,
    breakStep,
    completeCourse,
    publishCourse,
  ]);

  useEffect(() => {
    setIsVisible(
      fullCourse.details.completedSteps === fullCourse.steps?.length
    );
  }, [fullCourse.details.completedSteps, fullCourse.steps?.length]);

  const isCourseCompletable =
    fullCourse.details.completedSteps === fullCourse.steps?.length;

  const isCoursePublished = !!fullCourse.details.postedDate;

  const handleCompleteCourse = () =>
    completeCourse({ courseId: fullCourse.details.id }).then(() =>
      setIsVisible(false)
    );

  const handlePublishCourse = () => {
    completeCourse({ courseId: fullCourse.details.id }).then(() => {
      navigate('PublishCourse', { fullCourse });
      setIsVisible(false);
    });
  };

  return (
    <KContainer
      backgroundColor={colors.tundora}
      isScrollable
      hasTopInsets={false}>
      <KHeader
        title={fullCourse.details.title}
        date={fullCourse.details.startedAt}
        publishDate={fullCourse.details.postedDate}
      />
      <KSpacer h={sizes.s30} />
      <View flex center>
        <KStepSet
          fullCourse={fullCourse}
          steps={fullCourse.steps}
          width={width}
        />
      </View>
      {!fullCourse.details.completed && isCourseCompletable && (
        <>
          <KSpacer />
          <View width={width} center>
            <Button
              title="Complete course"
              onPress={() => setIsVisible(true)}
              center
            />
          </View>
        </>
      )}
      {!isCoursePublished && fullCourse.details.completed && (
        <>
          <KSpacer />
          <View width={width} center>
            <Button
              title="Publish course"
              onPress={() => setIsVisible(true)}
              background={colors.fruitSalad}
              center
            />
          </View>
        </>
      )}
      <KSpacer h={sizes.s20} />
      <KPublishCourseModal
        courseId={fullCourse.details.id}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onComplete={
          !fullCourse.details.completed ? handleCompleteCourse : undefined
        }
        onPublish={!isCoursePublished ? handlePublishCourse : undefined}
      />
    </KContainer>
  );
};
