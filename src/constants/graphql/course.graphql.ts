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
      }
      steps {
        details {
          id
          title
          parentStep
          priority
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
