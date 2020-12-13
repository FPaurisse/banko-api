const getCategoriesByAccount = async (parent, args, context) => {
    const { accountId } = args;
    const { models } = context;
    const categories = await models.Category.find({ accountId });
    return categories;
};

const getCategory = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const category = await models.Category.findById(_id);
    if (!category) {
        throw new Error('Category not found')
    }
    return category;
};

module.exports = { 
    getCategory, getCategoriesByAccount
}