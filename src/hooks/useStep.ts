import {
  BRAKE_STEP,
  CHANGE_STEP_STATE,
  CourseInfo,
  CourseModel,
  StepModel,
} from '@constants';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';
import { useError } from './useError';

export const useStep = () => {
  const { handleError } = useError();
  const { setShouldReload } = useStore(
    useShallow((courseInfo: CourseInfo) => courseInfo)
  );

  const [breakStepMutation] = useMutation(BRAKE_STEP);
  const [changeStepStateMutation] = useMutation(CHANGE_STEP_STATE);

  const changeStepState = useCallback(
    async ({
      courseId,
      stepId,
    }: {
      courseId: CourseModel['id'];
      stepId: StepModel['id'];
    }) => {
      handleError(
        await changeStepStateMutation({
          variables: { courseId, stepId },
        }).catch(err => err)
      );
      setShouldReload(true);
    },
    [changeStepStateMutation, handleError, setShouldReload]
  );

  const breakStep = useCallback(
    async ({ stepId, feedback }: { stepId: number; feedback: string }) => {
      handleError(
        await breakStepMutation({
          variables: { stepId, feedback },
        }).catch(err => err)
      );
      setShouldReload(true);
    },
    [breakStepMutation, handleError, setShouldReload]
  );

  return {
    changeStepState,
    breakStep,
  };
};
