const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const Operation = require('../../models/Operation')
const OperationType = require('./OperationType')

const QueryRootType = new GraphQLObjectType ({
    name: 'AppSchema',
    fields: () => ({
        operations: {
            type: new GraphQLList(OperationType),
            args: {
                month: {type: GraphQLString},
                year: {type: GraphQLString}
            },
            resolve: async (_, { month, year }) => {
                const operations = await Operation.find({ date: { "$regex": `${year}-${month}` } }).sort({'date': -1})
                return operations;
            }
        },
    })
});

module.exports = QueryRootType
