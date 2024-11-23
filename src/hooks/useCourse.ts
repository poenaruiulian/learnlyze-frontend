import { useMutation, useQuery } from '@apollo/client';
import {
  CourseModel,
  FullCourseModel,
  GENERATE_NEW_COURSE,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
} from '@constants';

export const useCourse = () => {
  const [generateNewCourseMutation] = useMutation(GENERATE_NEW_COURSE);
  const [getCourseByIdMutation] = useMutation(GET_COURSE_BY_ID);
  const { loading: areCoursesLoading, data } = useQuery(GET_ALL_COURSES);

  const generateNewCourse = async (
    description: string
  ): Promise<FullCourseModel> => {
    const response = await generateNewCourseMutation({
      variables: { description },
    });
    return response.data.generateCourse;
  };

  const getCourseById = async (courseId: number): Promise<FullCourseModel> => {
    const response = await getCourseByIdMutation({ variables: { courseId } });
    return response.data.getCourseById;
  };

  const courses: CourseModel[] = data && data.getCourses;

  return {
    generateNewCourse,
    getCourseById,
    areCoursesLoading,
    courses,
  };
};
