const { gql } = require('apollo-server-express');

// User schema

const user = gql`
  type User {
    id: ID!
    userName: String
    email: String
    password: String
  }
`;

module.exports = {
  user
};
