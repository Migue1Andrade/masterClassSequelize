const PostService = require('../../service/post.js');

module.exports = {
    async getByIdIncludesUser(req, res) {
        try {
            const { post_id } = req.params;
            const response = await PostService.getByIdIncludesUser(post_id);
            return res.json(response);
        } catch (error) {
            console.error("🚀 ~ getPostById ~ error:", error);
            return res.status(400).json({ error: 'Erro ao buscar o post' });
        }
    }
};
