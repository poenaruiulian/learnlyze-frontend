import { useCourse, useRoot } from '@hooks';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import {
  CourseModel,
  CoursesListsEnum,
  FullCourseModel,
  sizes,
  strings,
} from '@constants';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useFocusEffect } from '@react-navigation/native';
import { reverse, sortBy } from 'lodash-es';
import {
  KCoursesList,
  KLastAccessedCourseCard,
  KNewCourseCard,
} from './components';

export const HomeScreen = () => {
  const {
    courses: fetchedCourses,
    communityCourses,
    isLoading,
    getCourseById,
    refetchCourses,
  } = useCourse();
  const { setIsLoading } = useRoot();

  const [lastAccessedCourse, setLastAccessedCourse] =
    useState<FullCourseModel | null>(null);
  const [courses, setCourse] = useState<CourseModel[]>([]);
  const [completedCourses, setCompletedCourses] = useState<CourseModel[]>([]);

  const getLastAccessedCourse = useCallback(() => {
    const sortedCourse = courses
      ?.concat(communityCourses)
      ?.slice()
      .filter(course => !course.completed)
      .sort((course1, course2) =>
        moment(course1.lastAccessed).isBefore(course2.lastAccessed) ? 1 : -1
      );

    const lastAccessed = sortedCourse?.[0];

    console.log(lastAccessed);

    if (!lastAccessed) {
      setLastAccessedCourse(null);
      return;
    }

    getCourseById(lastAccessed?.id).then(course =>
      setLastAccessedCourse(course)
    );
  }, [communityCourses, courses, getCourseById]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(isLoading);
      refetchCourses().then(() => {
        setIsLoading(isLoading);
        getLastAccessedCourse();
      });
      // eslint-disable-next-line
    }, [
      isLoading,
      getLastAccessedCourse,
      refetchCourses,
      setIsLoading,
      fetchedCourses,
      communityCourses,
    ])
  );

  useEffect(() => {
    setCourse(fetchedCourses?.filter(course => !course.completed));
    setCompletedCourses(fetchedCourses?.filter(course => course.completed));
  }, [fetchedCourses]);

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <KNewCourseCard />
      <KSpacer h={sizes.s20} />
      {lastAccessedCourse && (
        <>
          <KLastAccessedCourseCard course={lastAccessedCourse} />
          <KSpacer h={sizes.s20} />
        </>
      )}
      <KCoursesList
        label={strings.home.courses}
        courses={reverse(sortBy(courses?.slice(), course => course.id))}
        type={CoursesListsEnum.courses}
      />
      <KSpacer h={sizes.s20} />
      <KCoursesList
        label={strings.home.savedFromCommunity}
        courses={communityCourses}
        type={CoursesListsEnum.community}
      />
      <KSpacer h={sizes.s20} />
      <KCoursesList
        label={strings.home.completedCourses}
        courses={completedCourses}
        type={CoursesListsEnum.completed}
      />
      <KSpacer h={sizes.s70} />
    </KContainer>
  );
};
