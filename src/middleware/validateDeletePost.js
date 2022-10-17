const { BlogPost } = require('../models');

const validateDeleteBlogPost = async (id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return { status: 404, message: 'Post does not exist' };

  if (post.userId !== userId) {
      return { status: 401, message: 'Unauthorized user' };
  }
  return { status: null, message: 'Ok, delete is valid' };
};

module.exports = {
  validateDeleteBlogPost,
};