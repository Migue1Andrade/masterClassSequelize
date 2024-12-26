const { Model, DataTypes } = require('sequelize');

class PostLikes extends Model {
    static init(connection) {
        super.init({
            user_id: DataTypes.INTEGER,
            user_post: DataTypes.INTEGER,
            liked_at: DataTypes.DATE,
            is_deleted: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            tableName: 'post_likes',
            postAt: 'post_at',
            updatedAt: 'updated_at',
        })
    }
}

module.exports = PostLikes;