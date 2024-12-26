const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        })
    }

    static associate(models) {
        User.belongsToMany(models.Post, {
            through: models.PostLike,
            foreignKey: 'user_id',
        });
      }

    async passwordIsValid(password) {
        return bcrypt.compare(password, this.password);
    }
};

module.exports = User;