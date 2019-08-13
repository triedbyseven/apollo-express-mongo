const express = require('express');
const { getUser } = require('./utils/getUser');
const { ApolloServer } = require('apollo-server-express');

require('./config');

// Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

// Schema
const { query } = require('./schema/query');
const { mutation } = require('./schema/mutation');
const { user } = require('./schema/user');
const { movie } = require('./schema/movie');

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs: [query, mutation, user, movie],
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];

    // Return user from token
    const user = getUser(token);

    return user;
  }
});

const app = express();
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
