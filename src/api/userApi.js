const User = require('../models/User.js');

module.exports = {
    async index(req, res) {
        try {
            const data = await User.findAll();

            return res.json(data);
        } catch(error) {
            console.log("🚀 ~ index ~ error:", error)
            
            return res.status(500).json({ error: 'Erro ao buscar dados do users' });
        }
    }
};