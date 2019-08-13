const { gql } = require('apollo-server-express');

// Movie Schema
const movie = gql`
  type Movie {
    id: ID
    userId: ID
    title: String
    genre: String
    releaseDate: String
  }

  type Tags {
    id: ID
    name: String
  }
`;

module.exports = {
  movie
};
