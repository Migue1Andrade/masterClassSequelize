const UserService = require('../../service/user.js');

module.exports = {
	async createUser(req, res) {
        try {
            const response = await UserService.createUser(req.body);
            return res.status(201).json(response);
        } catch (error) {
            console.error("🚀 ~ createUser ~ error:", error);
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
};