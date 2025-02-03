const UserService = require('../../service/user.js');

module.exports = {
    async index(req, res) {
        try {
            const data = await UserService.getAllUsers();
    
            if (!data.length) return res.status(204).json([]);
            
            return res.json(data);
        } catch (error) {
            console.error("🚀 ~ index ~ error:", error);
            return res.status(500).json({ error: error.message });
        }
    }    
}
