const express = require('express');

const postCreat = require('./controllers/post/create.js');
const getOnePostById = require('./controllers/post/getOne.js');
const removePost = require('./controllers/post/delete.js');
const getPosts = require('./controllers/post/getAll.js');

const getUsers = require('./controllers/users/getAll.js');
const updateUser = require('./controllers/users/update.js');
const createUser = require('./controllers/users/create.js');
const getAllPostById = require('./controllers/profile/profile.js');
const getUserById = require('./controllers/users/getOne.js');
const updatePost = require('./controllers/post/updateOne.js');
const getPostAndUserbyId = require('./controllers/post/getPostByIdIncludeUser.js')

const loginRequired = require('./middlewares/loginRequire.js');
const login = require('./controllers/login/login.js');

const likePost = require('./controllers/like/likePost.js');

const getLike = require('./controllers/like/isliked.js');

const routes = express.Router();

routes.post('/api/login', login.store);
routes.post('/api/post/create/:user_id', loginRequired, postCreat.store);
routes.post('/api/user/create', createUser.createUser);
routes.post('/api/user/like/:user_id/:post_id', loginRequired, likePost.like);

routes.get('/api/send/post/:post_id', loginRequired ,getOnePostById.index);
routes.get('/api/send/post/include/user/:post_id', loginRequired, getPostAndUserbyId.getByIdIncludesUser);

routes.put('/api/update/post/:post_id', loginRequired, updatePost.updatePost);
routes.put('/api/update/user/:user_id', loginRequired, updateUser.updateUser);

routes.get('/api/user', loginRequired, getUsers.index);
routes.get('/api/post', loginRequired, getPosts.index);
routes.get('/api/post/:user_id', loginRequired, getAllPostById.getUserPosts);
routes.get('/api/user/:user_id', loginRequired,getUserById.getUserById);
routes.get('/api/get/likes/:postId/:userId', loginRequired, getLike.checkLike)

routes.delete('/api/remove/post/:userId/:postId', loginRequired, removePost.delete);

module.exports = routes;
