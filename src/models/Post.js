const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static init(connection) {
        super.init({
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            text: DataTypes.STRING,
            summary: DataTypes.STRING,
            post_like: DataTypes.INTEGER, 
        }, {
            sequelize: connection,
            tableName: 'post',
            createdAt: 'post_at',
            updatedAt: 'updated_at',
        })
    }

    static associate(models) {
        Post.belongsToMany(models.User, {
            through: models.PostLikes,
            foreignKey: 'post_id',
    });
        Post.hasOne( models.User,{
            foreignKey: "user_id",
        })
  }

    async passwordIsValid(password) {
        return bcrypt.compare(password, this.password);
    }
};

module.exports = Post;