const UserService = require('../../service/user.js');

module.exports = {
    async getUserById(req, res) {
        try {
            const { user_id } = req.params;
            const user = await UserService.getUserById(user_id);
            return res.status(200).json(user);
        } catch (error) {
            console.error("🚀 ~ getUserById ~ error:", error);
            return res.status(403).json({ message: 'Erro ao buscar usuário' });
        }
    }
}