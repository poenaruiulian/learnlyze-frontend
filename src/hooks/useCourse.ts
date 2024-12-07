import { useMutation, useQuery } from '@apollo/client';
import {
  CHANGE_STEP_STATE,
  CourseModel,
  FullCourseModel,
  GENERATE_NEW_COURSE,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  StepModel,
} from '@constants';

export const useCourse = () => {
  const [generateNewCourseMutation] = useMutation(GENERATE_NEW_COURSE);
  const [getCourseByIdMutation] = useMutation(GET_COURSE_BY_ID);
  const [changeStepStateMutation] = useMutation(CHANGE_STEP_STATE);
  const { loading: areCoursesLoading, data } = useQuery(GET_ALL_COURSES);

  const generateNewCourse = async (
    description: string
  ): Promise<FullCourseModel> => {
    const response = await generateNewCourseMutation({
      variables: { description },
    });
    return response.data.generateCourse;
  };

  const getCourseById = async (
    courseId: CourseModel['id']
  ): Promise<FullCourseModel> => {
    const response = await getCourseByIdMutation({ variables: { courseId } });
    return response.data.getCourseById;
  };

  const courses: CourseModel[] = data && data.getCourses;

  const changeStepState = async ({
    courseId,
    stepId,
  }: {
    courseId: CourseModel['id'];
    stepId: StepModel['id'];
  }) => changeStepStateMutation({ variables: { courseId, stepId } });

  return {
    generateNewCourse,
    getCourseById,
    changeStepState,
    areCoursesLoading,
    courses,
  };
};
