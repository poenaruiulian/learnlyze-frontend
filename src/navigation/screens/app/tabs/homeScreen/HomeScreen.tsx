import { useCourse, useRoot } from '@hooks';
import { KContainer, KSpacer } from '@components';
import { images } from '@images';
import { sizes, strings } from '@constants';
import { useEffect } from 'react';
import { CoursesList } from './components';

export const HomeScreen = () => {
  const { courses, areCoursesLoading } = useCourse();
  const { setIsLoading } = useRoot();

  useEffect(() => {
    setIsLoading(areCoursesLoading);
  }, [areCoursesLoading, courses, setIsLoading]);

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <CoursesList label={strings.home.courses} courses={courses} />
      <KSpacer h={sizes.s36} />
      <CoursesList label={strings.home.savedFromCommunity} courses={[]} />
    </KContainer>
  );
};
