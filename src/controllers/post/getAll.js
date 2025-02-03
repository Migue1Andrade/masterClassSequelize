const PostService = require('../../service/post.js');

module.exports = {
    async index(req, res) {
        try {
            const posts = await PostService.getAllPosts();

            if (posts.length === 0) return res.status(204).json([]);

            return res.json(posts);
        } catch (error) {
            console.log("🚀 ERRO É ESSE:", error);
            return res.status(500).json({ error: error.message });
        }
    },
};
