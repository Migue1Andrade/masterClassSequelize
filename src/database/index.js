const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User.js');
const Post = require('../models/Post.js');
const PostLikes = require('../models/PostLikes.js')

const connection = new Sequelize(dbConfig);

function setupAssociations() {
	User.init(sequelize);
	Post.init(sequelize);
	PostLikes.init(sequelize);
  
	User.associate({ Post, PostLikes });
	Post.associate({ User, PostLikes });
}

User.init(connection);
Post.init(connection);
PostLikes.init(connection);

module.exports = connection, setupAssociations;