const createCategory = async (parent, args, context) => {
    const { ...rest } = args;
    const { models } = context;
    const newCategory = await models.Category.create({ ...rest });
    if (!newCategory) {
        throw new Error('Create error');
    }
    return newCategory
};

const updateCategory = async (parent, args, context) => {
    const { _id, ...rest } = args;
    const { models } = context;
    const category = await models.Category.findByIdAndUpdate(_id, { ...rest }, { new: true });
    if (!category) {
        throw new Error('Update error');
    }
    return category;
};

const deleteCategory = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const category = await models.Category.findByIdAndRemove(_id);
    if (!category) {
        throw new Error('Delete error');
    }
    await models.Operation.updateMany(
        { categories: _id },
        { $pull: { categories: _id } }
    )
    return category;
};

const deleteAllCategories = async (parent, args, context) => {
    const { models } = context;
    const categories = await models.Category.deleteMany();
    if (!categories) {
        throw new Error('Delete error');
    }
    await models.Operation.updateMany(
        {}, { $unset: { categories: [] } }
    )
    return true
};

module.exports = { 
    createCategory, updateCategory, deleteCategory, deleteAllCategories
}