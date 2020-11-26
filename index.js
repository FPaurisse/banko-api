const { ApolloServer } = require('apollo-server-express');

const { importSchema } = require('graphql-import');

const express = require('express');

const mongoose = require('mongoose');

const { KeycloakSchemaDirectives, KeycloakContext, KeycloakTypeDefs } = require('keycloak-connect-graphql');

const cors = require('cors');

const typeDefs = importSchema('./src/graphql/schema.graphql');
const models = require('./src/models');
const database = require('./config/database');
const { query, mutation, subscription } = require('./src/graphql/resolvers');
const { configureKeycloak } = require('./lib/common');

mongoose.Promise = global.Promise;
mongoose.connect(
    database.mongoConnectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('db connection is okay');
        }
    }
);

const resolvers = {
    Query: {
        ...query
    },
    Mutation: {
        ...mutation
    },
    Subscription: {
        ...subscription
    }
};

const app = express()

app.use(cors());

const graphqlPath = '/graphql'

// perform the standard keycloak-connect middleware setup on our app
const { keycloak } = configureKeycloak(app, graphqlPath)

const server = new ApolloServer({
    typeDefs: [KeycloakTypeDefs, typeDefs],
    schemaDirectives: KeycloakSchemaDirectives,
    resolvers,
    context: ({req}) => {
      return {
        models,
        kauth: new KeycloakContext({ req })
      }
    }
});

server.applyMiddleware({ app })

const port = 3001;

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
});