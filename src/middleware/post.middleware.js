const PostService = require('../services/blogPostService');

const validatePostField = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateUpdatePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validatePost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await PostService.getById(postId);
  const { id } = req.user.message.dataValues;

  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  if (id !== post.userId) return res.status(401).json({ message: 'Unauthorized user' });
  next();
};

module.exports = {
  validatePostField,
  validateUpdatePost,
  validatePost,
};