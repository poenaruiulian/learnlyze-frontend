import { useCourse, useRoot } from '@hooks';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { FullCourseModel, sizes, strings } from '@constants';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { CoursesList, LastAccessedCourseCard } from './components';

export const HomeScreen = () => {
  const { courses, areCoursesLoading, getCourseById } = useCourse();
  const { setIsLoading } = useRoot();

  const [lastAccessedCourse, setLastAccessedCourse] =
    useState<FullCourseModel | null>(null);

  useEffect(() => {
    setIsLoading(areCoursesLoading);
  }, [areCoursesLoading, courses, setIsLoading]);

  // Retrieve the full course form of the last accessed course
  useEffect(() => {
    const lastAccessed = courses?.sort((course1, course2) =>
      moment(course1.lastAccessed).isBefore(course2.lastAccessed) ? -1 : 1
    )[0];

    getCourseById(lastAccessed?.id).then(course =>
      setLastAccessedCourse(course)
    );
  }, [courses, getCourseById]);

  return (
    <KContainer backgroundImage={images.mainBackground}>
      {lastAccessedCourse && (
        <LastAccessedCourseCard course={lastAccessedCourse} />
      )}
      <KSpacer h={sizes.s36} />
      <CoursesList label={strings.home.courses} courses={courses} />
      <KSpacer h={sizes.s36} />
      <CoursesList label={strings.home.savedFromCommunity} courses={[]} />
    </KContainer>
  );
};
