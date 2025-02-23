import { gql } from '@apollo/client';

export const CHANGE_STEP_STATE = gql`
  mutation ($courseId: Int!, $stepId: Int!) {
    changeCompletionState(courseId: $courseId, stepId: $stepId) {
      completed
    }
  }
`;

export const BRAKE_STEP = gql`
  mutation ($stepId: Int!, $feedback: String!) {
    break(stepId: $stepId, feedback: $feedback) {
      id
      parentStep
      priority
      title
      description
      completed
    }
  }
`;
