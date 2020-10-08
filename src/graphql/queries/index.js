const { GraphQLList, GraphQLObjectType } = require('graphql');
const Operation = require('../../models/Operation')
const OperationType = require('./OperationType')

const QueryRootType = new GraphQLObjectType ({
    name: 'AppSchema',
    fields: () => ({
        operations: {
            type: new GraphQLList(OperationType),
            resolve: async function () {
              return await  Operation.find({}, (err, auth) => {
              });
            }
        },
    })
});

module.exports = QueryRootType
