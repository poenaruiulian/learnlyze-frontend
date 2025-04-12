import { KContainer, KSpacer } from '@components';
import { colors, CourseInfo, sizes, strings } from '@constants';
import { Button, View } from '@defaults';
import { useCourse } from '@hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useStore } from '@store';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { AppNavigationType, AppStackParamList } from '../../../type';
import { KHeader, KPublishCourseModal, KStepSet } from './components';

export const CourseScreen = () => {
  const { params } = useRoute<RouteProp<AppStackParamList, 'CourseScreen'>>();
  const { goBack, navigate } = useNavigation<AppNavigationType>();
  const { shouldReload, setShouldReload } = useStore(
    useShallow((courseInfo: CourseInfo) => courseInfo)
  );

  const { width } = useWindowDimensions();

  const { getCourseById, accessCourse, completeCourse } = useCourse();

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
    if (shouldReload) {
      getCourseById(fullCourse.details.id).then(response => {
        if (!response) {
          goBack();
          return;
        }
        setFullCourse(response);
      });
      setShouldReload(false);
    }
    // eslint-disable-next-line
  }, [shouldReload]);

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
        numberOfEnrollments={fullCourse.details.numberOfEnrollments}
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
