import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RANT = gql`
  mutation addRant($rantText: String!) {
    addRant(rantText: $rantText) {
      _id
      rantText
      rantAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($rantId: ID!, $commentText: String!) {
    addComment(rantId: $rantId, commentText: $commentText) {
      _id
      rantText
      rantAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
