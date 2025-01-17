const express = require('express');
const loginRequired = require('./middlewares/loginRequire.js');
const loginRequiredDelete = require('./middlewares/loginRequireDelete.js');

const User = require('./controllers/UserController.js');
const Token = require('./controllers/TokenController.js');
const post = require('./controllers/PostController.js');
const scroll = require('./controllers/ScrollController.js');
const postLike = require('./controllers/PostLikeController.js')

const routes = express.Router();

routes.post('/user/create', User.store);
routes.post('/login', Token.store);
routes.post('/post', loginRequired, post.store);
routes.post('/post/:id/like', loginRequired, postLike.store);

routes.put('/post/:id', loginRequired, post.update); 

routes.delete('/post/delete', loginRequiredDelete, post.delete);

routes.get('/post', loginRequired, scroll.postControllers);

module.exports = routes;