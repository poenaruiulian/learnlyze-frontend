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

export const GET_ALL_COURSES = gql`
  query {
    getCourses {
      id
      title
      startedAt
      lastAccessed
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  mutation ($courseId: Int!) {
    getCourseById(courseId: $courseId) {
      details {
        id
        title
        description
        tag
        startedAt
        lastAccessed
        postedDate
        completedSteps
      }
      steps {
        details {
          id
          title
          parentStep
          priority
          description
          generation
          hasChild
          completed
        }
        resources {
          id
          title
          external
        }
        subSteps {
          details {
            id
            title
            parentStep
            priority
            description
            generation
            hasChild
            completed
          }
          resources {
            id
            title
            external
          }
          subSteps {
            details {
              id
              title
              parentStep
              priority
              description
              generation
              hasChild
              completed
            }
            resources {
              id
              title
              external
            }
          }
        }
      }
    }
  }
`;

export const ACCESS_COURSE = gql`
  mutation ($courseId: Int!) {
    accessCourse(courseId: $courseId) {
      title
    }
  }
`;
