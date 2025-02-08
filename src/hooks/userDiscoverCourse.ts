import { useQuery } from '@apollo/client';
import { GET_DISCOVER } from '@constants';

export const useDiscoverCourses = ({
  tags,
  search,
}: {
  tags: string[];
  search: string;
}) => {
  const {
    loading: areDiscoverCoursesLoading,
    data: dataDiscover,
    refetch: refetchDiscoverCourses,
  } = useQuery(GET_DISCOVER, { variables: { tags, search } });

  return { areDiscoverCoursesLoading, dataDiscover, refetchDiscoverCourses };
};
