const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLBoolean } = require('graphql');

const OperationType = new GraphQLObjectType({
    name: 'OperationType',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        amount: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        isPassed: {type: new GraphQLNonNull(GraphQLBoolean)},
        isCredit: {type: new GraphQLNonNull(GraphQLBoolean)}
    })
});

module.exports = OperationType;
