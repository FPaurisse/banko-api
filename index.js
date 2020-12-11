require('dotenv').config();

const {
    KeycloakSchemaDirectives,
    KeycloakTypeDefs,
    KeycloakContext
}                           = require('keycloak-connect-graphql');
const { ApolloServer }      = require('apollo-server-express');
const { importSchema }      = require('graphql-import');
const mongoose              = require('mongoose');
const express               = require('express');
const cors                  = require('cors');

const { configureKeycloak } = require('./auth/keycloak');
const { query, mutation }   = require('./src/graphql/resolvers');
const database              = require('./config/database');
const models                = require('./src/models');

const typeDefs              = importSchema('./src/graphql/schema.graphql');

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
    }
};

const app = express()

app.use(cors());

const graphqlPath = '/graphql'

// perform the standard keycloak-connect middleware setup on our app
configureKeycloak(app, graphqlPath);

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