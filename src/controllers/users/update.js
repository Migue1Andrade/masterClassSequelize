const userService = require('../../service/user.js');

module.exports = {
    async updateUser(req, res) {
        const { user_id } = req.params;

        try {
            const response = await userService.updateUser(user_id, req.body);
            return res.status(200).json(response);
        } catch (error) {
            console.error("🚀 ~ updateUser ~ error:", error);
            return res.status(400).json({ error: error.message });
        }
    }
};
