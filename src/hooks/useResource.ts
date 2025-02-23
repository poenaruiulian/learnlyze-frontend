import { useMutation } from '@apollo/client';
import { REPLACE_RESOURCE } from '@constants';

export const useResource = () => {
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
    replaceResourceMutation({ variables: { stepId, resourceId, feedback } });

  return {
    replaceResource,
  };
};
