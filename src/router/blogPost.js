const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const { fieldValidate } = require('../middleware/validateBlogPost');
const { validateToken } = require('../middleware/validateJWT');

const routerBlogPost = express.Router();

routerBlogPost.post('/', validateToken, fieldValidate, blogPostController.insertBlogPost);

routerBlogPost.get('/', blogPostController.gatBlogPost);

routerBlogPost.get('/:id', blogPostController.gatBlogPostById);

routerBlogPost.delete('/:id', blogPostController.deleteBlogPost);

module.exports = {
  routerBlogPost,
};