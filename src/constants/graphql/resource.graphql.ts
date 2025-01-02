import { gql } from '@apollo/client';

export const REPLACE_RESOURCE = gql`
  mutation ($stepId: Int, $resourceId: Int, $feedback: String) {
    replaceResource(
      stepId: $stepId
      resourceId: $resourceId
      feedback: $feedback
    ) {
      id
      title
      external
    }
  }
`;
