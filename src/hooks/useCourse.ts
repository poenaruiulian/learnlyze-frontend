import { FetchResult, useMutation, useQuery } from '@apollo/client';
import {
  ACCESS_COURSE,
  CHANGE_STEP_STATE,
  CourseModel,
  ErrorModel,
  FullCourseModel,
  GENERATE_NEW_COURSE,
  GenericError,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  RootInfo,
  StepModel,
} from '@constants';
import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';

export const useCourse = () => {
  const { setHasError, setError } = useStore(
    useShallow((rootInfo: RootInfo) => rootInfo)
  );

  const [generateNewCourseMutation] = useMutation(GENERATE_NEW_COURSE);
  const [getCourseByIdMutation] = useMutation(GET_COURSE_BY_ID);
  const [changeStepStateMutation] = useMutation(CHANGE_STEP_STATE);
  const [accessCourseMutation] = useMutation(ACCESS_COURSE);
  const { loading: areCoursesLoading, data } = useQuery(GET_ALL_COURSES);

  const isErrorFree = (response: FetchResult<any>) => {
    if (response.errors && response.errors[0]) {
      let errorData = response.errors[0].extensions;
      errorData = errorData
        ? {
            message: errorData.message,
            description: errorData.description,
            code: errorData.code,
          }
        : GenericError;

      setError(errorData as ErrorModel);
      setHasError(true);

      return false;
    }
    return true;
  };

  const generateNewCourse = async (
    description: string
  ): Promise<FullCourseModel | null> => {
    const response = await generateNewCourseMutation({
      variables: { description },
    });

    if (!isErrorFree(response)) {
      return null;
    }

    return response.data.generateCourse;
  };

  const getCourseById = async (
    courseId: CourseModel['id']
  ): Promise<FullCourseModel | null> => {
    const response = await getCourseByIdMutation({ variables: { courseId } });

    if (!isErrorFree(response)) {
      return null;
    }

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

  const accessCourse = async ({ courseId }: { courseId: number }) =>
    accessCourseMutation({ variables: { courseId } });

  return {
    generateNewCourse,
    getCourseById,
    changeStepState,
    accessCourse,
    areCoursesLoading,
    courses,
  };
};
