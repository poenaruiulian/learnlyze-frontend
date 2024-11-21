import { gql } from '@apollo/client';

export const GENERATE_NEW_COURSE = gql`
  mutation GenerateCourse($description: String) {
    generateCourse(description: $description) {
      details {
        id
        title
        description
        tag
        startedAt
        postedDate
      }
      steps {
        details {
          id
          parentStep
          priority
          title
          description
        }
        resources {
          id
          title
          external
        }
      }
    }
  }
`;
