const User = require('../models/User.js');
const { hashSync, genSaltSync } = require('bcrypt')
const saltRounds = 10;

module.exports = {
	async store(req, res) {
		const { name, password, email } = req.body;
		
		try {
			const salt = genSaltSync(saltRounds);
			const user = await User.create({ name: name, password: hashSync(password, salt), email: email, profile_img: 'https://placehold.co/600x400' });

			return res.json(user);
		} catch (error) {
			console.error(error);

			return res.status(500).json({ error: 'Erro ao criar usuario' });
		}
	}
};