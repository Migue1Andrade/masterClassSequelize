'use strict';

/** @type {import('sequelize-cli').Migration} */
	
module.exports = {
	async up (queryInterface, Sequelize) {

		const transaction = await queryInterface.sequelize.transaction();
	
		try {
			
		await queryInterface.createTable('users', { 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false, 
			},
			name: {
				type: Sequelize.STRING, 
				allowNull: false, 
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING, 
				allowNull: false,
				unique: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
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
		await queryInterface.dropTable('users');
	} catch (error) {
		await transaction.rollback();
	}
  }
};