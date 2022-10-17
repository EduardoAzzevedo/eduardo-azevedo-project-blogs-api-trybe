const { BlogPost, User, Category, PostCategory, sequelize } = require('../models'); 
const { validateDeleteBlogPost } = require('../middleware/validateDeletePost');

const categoryIdsValidate = async (categoryIds) => {
  const categories = await Category.findAll();
  const array = [];

  for (let index = 0; index < categoryIds.length; index += 1) {
    const cateogy = categoryIds[index];
    array.push(categories.some(({ id }) => id === cateogy));
  }

  if (array.some((item) => item === false)) {
    return '"categoryIds" not found';
  }
};

const insertBlogPost = async (userId, title, content, categoryIds) => {
  const t = await sequelize.transaction();

  try {
    const categoriesIsValide = await categoryIdsValidate(categoryIds);

    if (categoriesIsValide === '"categoryIds" not found') {
      return { status: 400, message: { message: '"categoryIds" not found' } };
    }

    const blogPost = await BlogPost.create({
      title, content, userId }, { transaction: t });

    const categoriesPromisses = categoryIds.map((categoryId) => PostCategory.create({
      postId: blogPost.id, categoryId }, { transaction: t }));

    await Promise.all(categoriesPromisses);
    return { status: 201, message: blogPost };
    } catch (e) {
      await t.rollback();
      throw e;
    }
};

const deleteBlogPost = async (id, userId) => {
  const { status, message } = await validateDeleteBlogPost(id, userId);
  if (status) return { status, message };

  await BlogPost.destroy({
      where: { id, userId },
  });
  return { status: null, message: 'Ok, post deleted successfully' };
};

const getBlogPost = async () => {
  const post = await BlogPost.findAll({ attributes: { exclude: ['user_id'] },
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] },
    }],
  });
  return post;
};
const getBlogPostById = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    attributes: { exclude: ['user_id'] },
    include: [{
      model: User, as: 'user',
    }, { model: Category, as: 'categories', through: { attributes: [] },
    }],
  });
  return post;
};
module.exports = {
  insertBlogPost,
  deleteBlogPost,
  getBlogPost,
  getBlogPostById,
};