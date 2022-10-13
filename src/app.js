const express = require('express');
const router = require('./router/routerLogin');
const { routerUser } = require('./router/userRouter');
const { routerCategory } = require('./router/categoryRouter');

// ...

const app = express();

app.use(express.json());

app.use('/login', router);
app.use('/user', routerUser);
app.use('/categories', routerCategory);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
