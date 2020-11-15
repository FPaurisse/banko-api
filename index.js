const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const cors = require('cors')
const { PubSub } = require('graphql-yoga')

const models = require('./src/models');
const database = require('./config/database');
const { query, mutation, subscription } = require('./src/graphql/resolvers');

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

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    context: request => {
      return {
        ...request,
        models,
        pubsub
      }
    }
});

server.use(cors());

server.start({ port: 3001 }, () => console.log(`Server is running on http://localhost:3001`));