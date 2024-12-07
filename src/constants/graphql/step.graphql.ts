import { gql } from '@apollo/client';

export const CHANGE_STEP_STATE = gql`
  mutation ($courseId: Int!, $stepId: Int!) {
    changeStepState(courseId: $courseId, stepId: $stepId) {
      completed
    }
  }
`;
