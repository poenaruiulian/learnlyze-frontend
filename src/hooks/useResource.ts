import { useMutation } from '@apollo/client';
import { REPLACE_RESOURCE } from '@constants';
import { useCallback } from 'react';
import { useError } from './useError';

export const useResource = () => {
  const { handleError } = useError();

  const [replaceResourceMutation] = useMutation(REPLACE_RESOURCE);

  const replaceResource = useCallback(
    async ({
      stepId,
      resourceId,
      feedback,
    }: {
      stepId: number;
      resourceId: number;
      feedback: string;
    }) =>
      handleError(
        await replaceResourceMutation({
          variables: { stepId, resourceId, feedback },
        }).catch(err => err)
      ),
    [replaceResourceMutation, handleError]
  );

  return { replaceResource };
};
