const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Post extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			text: DataTypes.STRING,
			summary: DataTypes.STRING,
			likes: DataTypes.INTEGER,
			profile_img: DataTypes.STRING,
			post_img: DataTypes.STRING,
		}, {
			sequelize: connection,
            tableName: 'post',
			createdAt: 'post_at',
			updatedAt: 'updated_at',
		});
	}

	static associate(models) {
		Post.belongsTo(models.User, { foreignKey: 'user_id' });
		Post.hasMany(models.Comments, { foreignKey: 'post_id' });
		Post.hasMany(models.PostLikes, { foreignKey: 'post_id' });
	}

	async passwordIsValid(password) {
		return bcrypt.compare(password, this.password);
	}
}

module.exports = Post; 