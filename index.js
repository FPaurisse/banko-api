const express = require('express');
const expressGraphQL = require('express-graphql');
var cors = require('cors')

const schema = require('./src/graphql/schema');
const mongoose = require('mongoose');
const database = require('./config/database');

const port = 3001;

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

const app = express();

app.use(cors())

app.use('/', expressGraphQL.graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('server running at port', port)
});
