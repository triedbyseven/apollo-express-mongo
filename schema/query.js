const { gql } = require('apollo-server-express');

// Query Schema

const query = gql`
  type Query {
    getAllUsers: [User]
  }
`;

module.exports = {
  query
};
