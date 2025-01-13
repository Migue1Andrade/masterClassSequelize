const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comments = require('../models/Comments.js')

const connection = new Sequelize(dbConfig);

function setupAssociations() {
	User.init(Sequelize);
	Post.init(Sequelize);
    Comments.init(Sequelize);
}

User.init(connection);
Post.init(connection);
Comments.init(connection);

module.exports = connection, setupAssociations;