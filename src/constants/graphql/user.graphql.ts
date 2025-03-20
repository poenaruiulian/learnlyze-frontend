import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query {
    user {
      id
      email
      firstName
      lastName
    }
  }
`;

export const UPDATE_CURRENT_USER = gql`
  mutation ($newEmail: String, $firstName: String, $lastName: String) {
    update(newEmail: $newEmail, firstName: $firstName, lastName: $lastName) {
      access_token
    }
  }
`;
