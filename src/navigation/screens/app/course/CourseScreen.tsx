import { Button, View } from '@defaults';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KContainer, KSpacer } from '@components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { colors, sizes, strings } from '@constants';
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
    setIsVisible(
      fullCourse.details.completedSteps === fullCourse.steps?.length &&
        !fullCourse.details.postedDate &&
        !fullCourse.details.enrolledId
    );
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

  const isCourseCompletable = useMemo(
    () =>
      !fullCourse.details.completed &&
      fullCourse.details.completedSteps === fullCourse.steps?.length,
    [
      fullCourse.details.completed,
      fullCourse.details.completedSteps,
      fullCourse.steps?.length,
    ]
  );

  const isCoursePublishable = useMemo(
    () =>
      fullCourse.details.completed &&
      !fullCourse.details.postedDate &&
      !fullCourse.details.enrolledId,
    [
      fullCourse.details.completed,
      fullCourse.details.enrolledId,
      fullCourse.details.postedDate,
    ]
  );

  const handleCompleteCourse = useCallback(
    () =>
      completeCourse({ courseId: fullCourse.details.id }).then(() =>
        setIsVisible(false)
      ),
    [completeCourse, fullCourse.details.id]
  );

  const handlePublishCourse = useCallback(() => {
    completeCourse({ courseId: fullCourse.details.id }).then(() => {
      navigate('PublishCourse', { fullCourse });
      setIsVisible(false);
    });
  }, [completeCourse, fullCourse, navigate]);

  return (
    <KContainer
      backgroundColor={colors.tundora}
      isScrollable
      hasTopInsets={false}>
      <KHeader
        title={fullCourse.details.title}
        date={fullCourse.details.startedAt}
        publishDate={fullCourse.details.postedDate}
        enrolled={!!fullCourse.details.enrolledId}
      />
      <KSpacer h={sizes.s30} />
      <View flex centerH>
        <KStepSet
          fullCourse={fullCourse}
          steps={fullCourse.steps}
          width={width}
        />
      </View>
      {isCourseCompletable && (
        <>
          <KSpacer />
          <View width={width} center>
            <Button
              title={strings.course.complete}
              onPress={() => setIsVisible(true)}
              center
            />
          </View>
        </>
      )}
      {isCoursePublishable && !isCourseCompletable && (
        <>
          <KSpacer />
          <View width={width} center>
            <Button
              title={strings.course.publish}
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
        onPublish={isCoursePublishable ? handlePublishCourse : undefined}
      />
      <KSpacer h={sizes.s60} />
    </KContainer>
  );
};
