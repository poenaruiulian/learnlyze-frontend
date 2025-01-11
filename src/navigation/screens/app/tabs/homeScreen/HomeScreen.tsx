import { useCourse } from '@hooks';
import { KContainer } from '@components';
import { images } from '@images';
import { CoursesList } from './components';

export const HomeScreen = () => {
  const { courses } = useCourse();

  return (
    <KContainer backgroundImage={images.mainBackground}>
      <CoursesList label="Courses" courses={courses} />
    </KContainer>
  );
};
