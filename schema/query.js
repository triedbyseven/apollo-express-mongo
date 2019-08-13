const { gql } = require('apollo-server-express');

// Query Schema

const query = gql`
  type Query {
    getAllUsers: [User]
    getAllMovies: [Movie]
  }
`;

module.exports = {
  query
};
