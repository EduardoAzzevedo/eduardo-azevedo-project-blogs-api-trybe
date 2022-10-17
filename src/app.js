const express = require('express');
const { validateLogin, validateNewUser } = require('./middleware/user.middleware');
const UserController = require('./controllers/userController');
const validateJWT = require('./authorization/JWT');
const { routerCategory } = require('./router/categoryRouter');
const { routerBlogPost } = require('./router/blogPost');

// ...

const app = express();

app.use(express.json());

app.post('/login', validateLogin, UserController.login);
app.post('/user', validateNewUser, UserController.createUser);
app.get('/user', validateJWT, UserController.getAllUsers);
app.use('/categories', routerCategory);
app.use('/post', routerBlogPost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
