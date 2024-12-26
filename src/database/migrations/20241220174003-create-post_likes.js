'use strict';

/** @type {import('sequelize-cli').Migration} */
    
module.exports = {
    async up (queryInterface, Sequelize) {

        const transaction = await queryInterface.sequelize.transaction();
    
        try {
            
        await queryInterface.createTable('post_likes', { 
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'post',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
            liked_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: 0
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        }, { transaction });

        await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

  async down (queryInterface, Sequelize) {

    const transaction = queryInterface.sequelize.transaction();

    try {
        await queryInterface.dropTable('post_likes');
    } catch (error) {
        await transaction.rollback();
    }
  }
};