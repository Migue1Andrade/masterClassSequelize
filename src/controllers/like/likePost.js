const LikeService = require('../../service/like.js');

module.exports = {
    async like(req, res) {
        try {
            const { post_id, user_id } = req.params;
            const response = await LikeService.toggleLike(post_id, user_id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("🚀 ~ likePost ~ error:", error);
            return res.status(500).json({ error: 'Erro ao registrar like' });
        }
    }
}
