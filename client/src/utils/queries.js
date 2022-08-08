import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilePic
      rants {
        _id
        rantText
        createdAt
      }
    }
  }
`;

export const QUERY_RANTS = gql`
  query getRants {
    rants {
      _id
      rantText
      rantAuthor
      company
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RANT = gql`
  query getSingleRant($rantId: ID!) {
    rant(rantId: $rantId) {
      _id
      rantText
      rantAuthor
      company
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      profilePic
      rants {
        _id
        rantText
        rantAuthor
        createdAt
      }
    }
  }
`;
