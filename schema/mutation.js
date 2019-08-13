const { gql } = require('apollo-server-express');

// Mutation Schema

const mutation = gql`
  type Mutation {
    addUser(userName: String!, email: String!, password: String!): AuthPayLoad!
    addMovie(
      userId: ID!
      title: String!
      genre: String!
      releaseDate: String!
    ): Movie
    updateUser(id: ID!, email: String!): User
    deleteUser(email: String!): User
    deleteMovie(id: ID!): Movie
  }
`;

module.exports = {
  mutation
};
