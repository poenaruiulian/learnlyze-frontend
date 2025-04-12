import { useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_USER, UPDATE_CURRENT_USER, UserModel } from '@constants';
import { useCallback } from 'react';

import { useError } from './useError';
import { useRoot } from './useRoot';

export const useUser = () => {
  const { handleError } = useError();
  const { setToken } = useRoot();

  const { loading, data, refetch } = useQuery(GET_CURRENT_USER);
  const [updateCurrentUserMutation] = useMutation(UPDATE_CURRENT_USER);

  const user: UserModel | null = data?.user ?? null;

  const update = useCallback(
    async (variables: {
      firstName?: string;
      lastName?: string;
      newEmail?: string;
    }) => {
      handleError(
        await updateCurrentUserMutation({ variables })
          .then(response =>
            setToken(response.data.update.access_token as string | null)
          )
          .then(() => refetch())
          .catch(err => err)
      );
    },
    [handleError, refetch, setToken, updateCurrentUserMutation]
  );

  return {
    user,
    update,
    refetch,

    loading,
  };
};
