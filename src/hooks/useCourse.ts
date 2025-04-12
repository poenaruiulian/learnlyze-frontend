import { useMutation, useQuery } from '@apollo/client';
import {
  ACCESS_COURSE,
  CHANGE_PUBLISH_DETAILS,
  COMPLETE_COURSE,
  CourseInfo,
  CourseModel,
  ENROLL_COURSE,
  FullCourseModel,
  GENERATE_NEW_COURSE,
  GET_ALL_COMMUNITY_COURSES,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  PUBLISH_COURSE,
} from '@constants';
import { useCallback, useMemo } from 'react';
import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';
import { useError } from './useError';

export const useCourse = () => {
  const { handleError } = useError();
  const { setShouldReload } = useStore(
    useShallow((courseInfo: CourseInfo) => courseInfo)
  );

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

  const refetchCourses = useCallback(async () => {
    await refetch();
    await refetchCommunityCourses();
  }, [refetch, refetchCommunityCourses]);

  const isLoading = useMemo(
    () => areCoursesLoading || areCommunityCoursesLoading,
    [areCoursesLoading, areCommunityCoursesLoading]
  );

  const courses: CourseModel[] = useMemo(() => data?.getAll || [], [data]);
  const communityCourses = useMemo(
    () => dataCommunity?.getAllCommunity || [],
    [dataCommunity]
  );

  const getCourseById = useCallback(
    async (courseId: CourseModel['id']): Promise<FullCourseModel | null> => {
      const response = handleError(
        await getCourseByIdMutation({ variables: { courseId } })
      );
      return response ? response.data.getFullById : null;
    },
    [getCourseByIdMutation, handleError]
  );

  const generateNewCourse = useCallback(
    async (description: string): Promise<FullCourseModel | null> => {
      const response = handleError(
        await generateNewCourseMutation({ variables: { description } })
      );
      return response ? response.data.generate : null;
    },
    [generateNewCourseMutation, handleError]
  );

  const changePublishDetails = useCallback(
    async (variables: {
      courseId: number;
      title?: string;
      description?: string;
      tags?: string[];
    }) =>
      handleError(
        await changePublishDetailsMutation({ variables }).catch(err => err)
      ),
    [changePublishDetailsMutation, handleError]
  );

  const accessCourse = useCallback(
    async ({ courseId }: { courseId: number }) =>
      handleError(
        await accessCourseMutation({ variables: { courseId } }).catch(
          err => err
        )
      ),
    [accessCourseMutation, handleError]
  );

  const completeCourse = useCallback(
    async ({ courseId }: { courseId: number }) => {
      handleError(
        await completeCourseMutation({ variables: { courseId } }).catch(
          err => err
        )
      );
      setShouldReload(true);
    },
    [completeCourseMutation, handleError, setShouldReload]
  );

  const publishCourse = useCallback(
    async ({ courseId }: { courseId: number }) => {
      handleError(
        await publishCourseMutation({ variables: { courseId } }).catch(
          err => err
        )
      );
      setShouldReload(true);
    },
    [handleError, publishCourseMutation, setShouldReload]
  );

  const enrollCourse = useCallback(
    async ({ courseId }: { courseId: number }) =>
      handleError(
        await enrollCourseMutation({ variables: { courseId } }).catch(
          err => err
        )
      ),
    [enrollCourseMutation, handleError]
  );

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
