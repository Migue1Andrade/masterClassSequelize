const express = require('express');
const loginRequired = require('./middlewares/loginRequire.js');
const loginRequiredDelete = require('./middlewares/loginRequireDelete.js');

const getUsers = require('./api/userApi.js');
const getPosts = require('./api/postApi.js');
const removePost = require('./api/removePost.js');
const updateUser = require('./api/updateUserApi.js');
const login = require('./api/loginApi.js');
const postCreat = require('./api/createPostApi.js');
const getAllPostById = require('./api/profilePost.js');
const createUser = require('./api/userRegisterApi.js');
const getUserById = require('./api/getUserByIdApi.js');
const likePost = require('./api/likePost.js');
const updatePost = require('./api/updatePost.js');
const getOnePostById = require('./api/getOnePostById.js');
const getPostAndUserbyId = require('./api/getPostByIdIncludeUser.js')
const getLike = require('./api/isliked')

const routes = express.Router();

routes.post('/api/login', login.store);
routes.post('/api/post/create/:user_id', loginRequired, postCreat.store);
routes.post('/api/user/create', createUser.store);
routes.post('/api/user/like/:user_id/:post_id', loginRequired, likePost.like);

routes.put('/api/update/post/:post_id', loginRequired, updatePost.update);
routes.get('/api/send/post/:post_id', loginRequired ,getOnePostById.index);
routes.get('/api/send/post/include/user/:post_id', loginRequired, getPostAndUserbyId.index);

routes.put('/api/update/user/:user_id', loginRequired, updateUser.updateUser);

routes.get('/api/user', getUsers.index);
routes.get('/api/post', getPosts.index);
routes.get('/api/post/:user_id', getAllPostById.index);
routes.get('/api/user/:user_id', loginRequired,getUserById.index);
routes.get('/api/get/likes/:postId/:userId', loginRequired, getLike.check)

routes.delete('/api/remove/post/:userId/:postId', removePost.delete);

module.exports = routes;
