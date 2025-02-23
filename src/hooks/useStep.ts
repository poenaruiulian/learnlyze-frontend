import {
  BRAKE_STEP,
  CHANGE_STEP_STATE,
  CourseModel,
  StepModel,
} from '@constants';
import { useMutation } from '@apollo/client';

export const useStep = () => {
  const [breakStepMutation] = useMutation(BRAKE_STEP);
  const [changeStepStateMutation] = useMutation(CHANGE_STEP_STATE);

  const changeStepState = async ({
    courseId,
    stepId,
  }: {
    courseId: CourseModel['id'];
    stepId: StepModel['id'];
  }) => changeStepStateMutation({ variables: { courseId, stepId } });

  const breakStep = async ({
    stepId,
    feedback,
  }: {
    stepId: number;
    feedback: string;
  }) => breakStepMutation({ variables: { stepId, feedback } });

  return {
    changeStepState,
    breakStep,
  };
};
