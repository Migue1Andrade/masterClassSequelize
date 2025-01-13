const { Model, DataTypes } = require('sequelize');

class PostLikes extends Model {
    static init(connection) {
        super.init({
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'post_likes',
            createdAt: 'post_at',
            updatedAt: 'updated_at',
        });
    }

    static associate(models) {
        PostLikes.belongsTo(models.User, { foreignKey: 'user_id' });
        PostLikes.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
}

module.exports = PostLikes;