const { gql } = require('apollo-server-express');

// Mutation Schema

const mutation = gql`
  type Mutation {
    addUser(userName: String!, email: String!): User
    deleteUser(email: String!): User
  }
`;

module.exports = {
  mutation
};
