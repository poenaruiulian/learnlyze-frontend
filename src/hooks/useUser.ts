import { useQuery } from '@apollo/client';
import { UserModel, GET_CURRENT_USER } from '@constants';

export const useUser = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  const user: UserModel | null = data?.user ?? null;

  return {
    user,
    loading,
  };
};
