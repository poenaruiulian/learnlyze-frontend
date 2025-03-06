import { useMutation } from '@apollo/client';
import { REPLACE_RESOURCE } from '@constants';
import { useError } from './useError';

export const useResource = () => {
  const { handleError } = useError();

  const [replaceResourceMutation] = useMutation(REPLACE_RESOURCE);

  const replaceResource = async ({
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
    );

  return {
    replaceResource,
  };
};
