const User = require('../models/User.js');

module.exports = {
    async index(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            
            if (!userId) {
                return res.status(400).json({ error: 'ID do usuário é obrigatório' });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.status(200).json({ name: user.name });

        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }
};