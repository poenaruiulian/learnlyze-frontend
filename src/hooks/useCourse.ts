import { FetchResult, useMutation, useQuery } from '@apollo/client';
import {
  RootInfo,
  CourseModel,
  ErrorModel,
  FullCourseModel,
  ACCESS_COURSE,
  GENERATE_NEW_COURSE,
  GenericError,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  GET_ALL_COMMUNITY_COURSES,
  CHANGE_PUBLISH_DETAILS,
  COMPLETE_COURSE,
  PUBLISH_COURSE,
  ENROLL_COURSE,
} from '@constants';
import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';

export const useCourse = () => {
  const { setHasError, setError } = useStore(
    useShallow((rootInfo: RootInfo) => rootInfo)
  );

  // Courses mutations
  const [getCourseByIdMutation] = useMutation(GET_COURSE_BY_ID);
  const [generateNewCourseMutation] = useMutation(GENERATE_NEW_COURSE);
  const [accessCourseMutation] = useMutation(ACCESS_COURSE);
  const [changePublishDetailsMutation] = useMutation(CHANGE_PUBLISH_DETAILS);
  const [completeCourseMutation] = useMutation(COMPLETE_COURSE);
  const [publishCourseMutation] = useMutation(PUBLISH_COURSE);
  const [enrollCourseMutation] = useMutation(ENROLL_COURSE);

  // Resources mutations

  // Course queries
  const {
    loading: areCoursesLoading,
    data,
    refetch,
  } = useQuery(GET_ALL_COURSES);

  const {
    loading: areCommunityCoursesLoading,
    data: dataCommunity,
    refetch: refetchCommunityCourses,
  } = useQuery(GET_ALL_COMMUNITY_COURSES);

  const refetchCourses = async () => {
    await refetch();
    await refetchCommunityCourses();
  };

  // Handling errors and loadings
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

  const isLoading = areCoursesLoading || areCommunityCoursesLoading;

  // Courses lists from queries
  const courses: CourseModel[] = useMemo(() => data && data.getAll, [data]);

  const communityCourses: CourseModel[] = useMemo(
    () => dataCommunity,
    [dataCommunity]
  );

  const getCourseById = async (
    courseId: CourseModel['id']
  ): Promise<FullCourseModel | null> => {
    const response = await getCourseByIdMutation({ variables: { courseId } });

    if (!isErrorFree(response)) {
      return null;
    }

    return response.data.getFullById;
  };

  // Handle course actions
  const generateNewCourse = async (
    description: string
  ): Promise<FullCourseModel | null> => {
    const response = await generateNewCourseMutation({
      variables: { description },
    });

    if (!isErrorFree(response)) {
      return null;
    }

    return response.data.generate;
  };

  const changePublishDetails = async (variables: {
    courseId: number;
    title?: string;
    description?: string;
    tags?: string[];
  }) => {
    const response = await changePublishDetailsMutation({ variables });

    if (!isErrorFree(response)) {
      return null;
    }

    return response;
  };

  const accessCourse = async ({ courseId }: { courseId: number }) =>
    accessCourseMutation({ variables: { courseId } });

  const completeCourse = async ({ courseId }: { courseId: number }) =>
    completeCourseMutation({ variables: { courseId } });

  const publishCourse = async ({ courseId }: { courseId: number }) =>
    publishCourseMutation({ variables: { courseId } });

  const enrollCourse = async ({ courseId }: { courseId: number }) =>
    enrollCourseMutation({ variables: { courseId } });

  return {
    courses,
    communityCourses,

    isLoading,

    getCourseById,
    refetchCourses,

    generateNewCourse,
    accessCourse,
    changePublishDetails,
    completeCourse,
    publishCourse,
    enrollCourse,
  };
};
