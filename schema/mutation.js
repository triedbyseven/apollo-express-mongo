const { gql } = require('apollo-server-express');

// Mutation Schema

const mutation = gql`
  type Mutation {
    addUser(userName: String!, email: String!, password: String!): User
    updateUser(id: ID!, email: String!): User
    deleteUser(email: String!): User
  }
`;

module.exports = {
  mutation
};
