const express = require('express');
const { validateLogin, validateNewUser } = require('./middleware/user.middleware');
const { validatePostField, validateUpdatePost,
  validatePost } = require('./middleware/post.middleware');
const UserController = require('./controllers/userController');
const validateJWT = require('./utils/validateToken');
const CategoryController = require('./controllers/categoryController');
const BlogPostController = require('./controllers/blogPostController');

// ...

const app = express();

app.use(express.json());

app.post('/login', validateLogin, UserController.login);
app.post('/user', validateNewUser, UserController.createUser);
app.get('/user', validateJWT, UserController.getAllUsers);
app.post('/post', validateJWT, validatePostField, BlogPostController.createPost);
app.get('/user', validateJWT, UserController.getAllUsers);
app.get('/post', validateJWT, BlogPostController.getAllPosts);
app.get('/post/search', validateJWT, BlogPostController.searchPost);
app.get('/post/:id', validateJWT, BlogPostController.getById);
app.put('/post/:id', validateJWT, validateUpdatePost, validatePost,
  BlogPostController.updatePostById);
app.delete('/post/:id', validateJWT, validatePost, BlogPostController.deletePost);
app.delete('/user/me', validateJWT, UserController.deleteMe);
app.get('/user/:id', validateJWT, UserController.getById);
app.get('/categories', validateJWT, CategoryController.getAllCategories);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
