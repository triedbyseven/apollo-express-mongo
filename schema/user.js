const { gql } = require('apollo-server-express');

// User schema
const user = gql`
  type User {
    id: ID
    userName: String
    email: String
    password: String
    movies: [Movie]
  }

  type AuthPayLoad {
    token: String
    user: User
  }
`;

module.exports = {
  user
};
