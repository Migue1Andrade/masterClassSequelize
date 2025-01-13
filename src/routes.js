const express = require('express');
const loginRequired = require('./middlewares/loginRequire.js');
const loginRequiredDelete = require('./middlewares/loginRequireDelete.js');

const User = require('./controllers/UserController.js');
const Token = require('./controllers/TokenController.js');
const post = require('./controllers/PostController.js');
const scroll = require('./controllers/ScrollController.js');

const getUsers = require('./api/userApi.js');
const getPosts = require('./api/postApi.js');
const getName = require('./api/getNameApi.js');
const removePost = require('./api/removePost.js');


const routes = express.Router();

routes.post('/user/create', User.store);
routes.post('/login', Token.store);
routes.post('/creat/post', loginRequired, post.store);

routes.put('/post/:id', loginRequired, post.update); 

routes.delete('/post/delete', loginRequiredDelete, post.delete);

routes.get('/post', loginRequired, scroll.postControllers);

routes.get('/api/user', getUsers.index);
routes.get('/api/post', getPosts.index);
routes.get('/api/:id', getName.index);

routes.delete('/api/remove/post/:userId/:postId', removePost.remove);

module.exports = routes;