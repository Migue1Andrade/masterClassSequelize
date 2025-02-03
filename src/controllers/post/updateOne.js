const PostService = require('../../service/post.js');

module.exports = { 
	async updatePost(req, res) {
        try {
            const { post_id } = req.params;
            const response = await PostService.updatePost(post_id, req.body);
            return res.json(response);
        } catch (error) {
            console.error("🚀 ~ updatePost ~ error:", error);
            return res.status(400).json({ error: 'Erro ao atualizar o post' });
        }
    }
}
