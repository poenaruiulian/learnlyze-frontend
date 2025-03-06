import {
  BRAKE_STEP,
  CHANGE_STEP_STATE,
  CourseModel,
  StepModel,
} from '@constants';
import { useMutation } from '@apollo/client';
import { useError } from './useError';

export const useStep = () => {
  const { handleError } = useError();

  const [breakStepMutation] = useMutation(BRAKE_STEP);
  const [changeStepStateMutation] = useMutation(CHANGE_STEP_STATE);

  const changeStepState = async ({
    courseId,
    stepId,
  }: {
    courseId: CourseModel['id'];
    stepId: StepModel['id'];
  }) =>
    handleError(
      await changeStepStateMutation({
        variables: { courseId, stepId },
      }).catch(err => err)
    );

  const breakStep = async ({
    stepId,
    feedback,
  }: {
    stepId: number;
    feedback: string;
  }) =>
    handleError(
      await breakStepMutation({
        variables: { stepId, feedback },
      }).catch(err => err)
    );

  return {
    changeStepState,
    breakStep,
  };
};
