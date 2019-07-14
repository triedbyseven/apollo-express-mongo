const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('./config');

// Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

// Schema
const { query } = require('./schema/query');
const { mutation } = require('./schema/mutation');
const { user } = require('./schema/user');

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs: [query, mutation, user],
  resolvers
});

const app = express();
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
