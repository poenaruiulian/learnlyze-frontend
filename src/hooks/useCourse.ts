import { useMutation, useQuery } from '@apollo/client';
import {
  CourseModel,
  FullCourseModel,
  ACCESS_COURSE,
  GENERATE_NEW_COURSE,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  GET_ALL_COMMUNITY_COURSES,
  CHANGE_PUBLISH_DETAILS,
  COMPLETE_COURSE,
  PUBLISH_COURSE,
  ENROLL_COURSE,
} from '@constants';
import { useMemo } from 'react';
import { useError } from './useError';

export const useCourse = () => {
  const { handleError } = useError();

  const [getCourseByIdMutation] = useMutation(GET_COURSE_BY_ID);
  const [generateNewCourseMutation] = useMutation(GENERATE_NEW_COURSE);
  const [accessCourseMutation] = useMutation(ACCESS_COURSE);
  const [changePublishDetailsMutation] = useMutation(CHANGE_PUBLISH_DETAILS);
  const [completeCourseMutation] = useMutation(COMPLETE_COURSE);
  const [publishCourseMutation] = useMutation(PUBLISH_COURSE);
  const [enrollCourseMutation] = useMutation(ENROLL_COURSE);

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

  const isLoading = areCoursesLoading || areCommunityCoursesLoading;

  // Current user courses (that are not from the community)
  const courses: CourseModel[] = useMemo(() => data && data.getAll, [data]);

  // Current user courses from which he enrolled
  const communityCourses: CourseModel[] = useMemo(
    () => dataCommunity && dataCommunity.getAllCommunity,
    [dataCommunity]
  );

  const getCourseById = async (
    courseId: CourseModel['id']
  ): Promise<FullCourseModel | null> => {
    const response = handleError(
      await getCourseByIdMutation({ variables: { courseId } })
    );

    return response ? response.data.getFullById : null;
  };

  const generateNewCourse = async (
    description: string
  ): Promise<FullCourseModel | null> => {
    const response = handleError(
      await generateNewCourseMutation({
        variables: { description },
      })
    );

    return response ? response.data.generate : null;
  };

  const changePublishDetails = async (variables: {
    courseId: number;
    title?: string;
    description?: string;
    tags?: string[];
  }) => handleError(await changePublishDetailsMutation({ variables }));

  const accessCourse = async ({ courseId }: { courseId: number }) =>
    handleError(await accessCourseMutation({ variables: { courseId } }));

  const completeCourse = async ({ courseId }: { courseId: number }) =>
    handleError(await completeCourseMutation({ variables: { courseId } }));

  const publishCourse = async ({ courseId }: { courseId: number }) =>
    handleError(await publishCourseMutation({ variables: { courseId } }));

  const enrollCourse = async ({ courseId }: { courseId: number }) =>
    handleError(await enrollCourseMutation({ variables: { courseId } }));

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
