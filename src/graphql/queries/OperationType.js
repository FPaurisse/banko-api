const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');

const OperationType = new GraphQLObjectType({
    name: 'OperationType',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        amount: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)}
    })
});

module.exports = OperationType;
