import { useMutation } from '@apollo/client';
import { CourseInfo, REPLACE_RESOURCE } from '@constants';
import { useCallback } from 'react';
import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';
import { useError } from './useError';

export const useResource = () => {
  const { handleError } = useError();
  const { setShouldReload } = useStore(
    useShallow((courseInfo: CourseInfo) => courseInfo)
  );

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
    }) => {
      handleError(
        await replaceResourceMutation({
          variables: { stepId, resourceId, feedback },
        }).catch(err => err)
      );
      setShouldReload(true);
    },
    [handleError, replaceResourceMutation, setShouldReload]
  );

  return { replaceResource };
};
