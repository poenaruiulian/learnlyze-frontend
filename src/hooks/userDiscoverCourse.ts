import { useQuery } from '@apollo/client';
import { CourseModel, GET_DISCOVER } from '@constants';
import { useMemo } from 'react';

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
    refetch: refetchDiscoverCourses,
    error,
  } = useQuery(GET_DISCOVER, { variables: { tags, search } });

  const courses = useMemo<CourseModel[]>(
    () => dataDiscover && dataDiscover.getDiscover,
    [dataDiscover]
  );

  return {
    areDiscoverCoursesLoading,
    courses,
    refetchDiscoverCourses,
    error,
  };
};
