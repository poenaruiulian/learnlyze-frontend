import { useQuery } from '@apollo/client';
import { UserModel, GET_CURRENT_USER } from '@constants';

export const useUser = () => {
  const { loading: isUserLoading, data } = useQuery(GET_CURRENT_USER);

  const user: UserModel | null = data?.user ?? null;

  const loading = isUserLoading;

  return {
    user,
    loading,
  };
};
