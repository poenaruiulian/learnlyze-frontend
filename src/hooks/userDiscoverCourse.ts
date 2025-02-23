import { useQuery } from '@apollo/client';
import { CourseModel, GET_DISCOVER } from '@constants';
import { useCallback, useMemo } from 'react';

export const useDiscoverCourses = ({
  tags,
  search,
}: {
  tags: string[] | null;
  search: string | null;
}) => {
  const {
    loading: areDiscoverCoursesLoading,
    data: dataDiscover,
    refetch,
    error,
  } = useQuery(GET_DISCOVER, { variables: { tags, search } });

  const courses = useMemo<CourseModel[]>(
    () => dataDiscover && dataDiscover.getDiscover,
    [dataDiscover]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refetchDiscoverCourses = useCallback(() => refetch(), [tags, search]);

  return {
    areDiscoverCoursesLoading,
    courses,
    refetchDiscoverCourses,
    error,
  };
};
