const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    rants: [Rant]!
  }

  type Rant {
    _id: ID
    rantText: String
    rantAuthor: String
    company: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    rants(username: String): [Rant]
    rant(rantId: ID!): Rant
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRant(rantText: String!): Rant
    addComment(rantId: ID!, commentText: String!): Rant
    removeRant(rantId: ID!): Rant
    removeComment(rantId: ID!, commentId: ID!): Rant
  }
`;

module.exports = typeDefs;
