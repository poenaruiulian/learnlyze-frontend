import { gql } from '@apollo/client';

const GET_ALL_COURSES = gql`
  query {
    getAll {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

const GET_ALL_COMMUNITY_COURSES = gql`
  query {
    getAllCommunity {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

const GET_DISCOVER = gql`
  query ($tags: [String], $search: String) {
    getDiscover(tags: $tags, search: $search) {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

const GET_COURSE_BY_ID = gql`
  mutation ($courseId: Int!) {
    getFullById(courseId: $courseId) {
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

const GENERATE_NEW_COURSE = gql`
  mutation ($description: String) {
    generate(description: $description) {
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

const ACCESS_COURSE = gql`
  mutation ($courseId: Int!) {
    access(courseId: $courseId) {
      title
    }
  }
`;

const CHANGE_PUBLISH_DETAILS = gql`
  mutation (
    $courseId: Int!
    $title: String
    $description: String
    $tags: [String]
  ) {
    changePublishDetails(
      courseId: $courseId
      title: $title
      description: $description
      tags: $tags
    ) {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

const COMPLETE_COURSE = gql`
  mutation ($courseId: Int!) {
    complete(courseId: $courseId) {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

const PUBLISH_COURSE = gql`
  mutation ($courseId: Int!) {
    publish(courseId: $courseId) {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

const ENROLL_COURSE = gql`
  mutation ($courseId: Int!) {
    enroll(courseId: $courseId) {
      id
      title
      startedAt
      lastAccessed
      completedSteps
      steps
      lastAccessed
    }
  }
`;

export {
  GET_COURSE_BY_ID,
  GET_ALL_COURSES,
  GET_ALL_COMMUNITY_COURSES,
  GET_DISCOVER,
  GENERATE_NEW_COURSE,
  ACCESS_COURSE,
  PUBLISH_COURSE,
  ENROLL_COURSE,
  COMPLETE_COURSE,
  CHANGE_PUBLISH_DETAILS,
};
