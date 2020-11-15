const newOperationSubscribe = (parent, args, context, info) => {
    return context.pubsub.asyncIterator("NEW_OPERATION");
}
  
const newOperation = {
    subscribe: newOperationSubscribe,
    resolve: payload => {
        return payload
    }
};
  
module.exports = {
    newOperation,
}