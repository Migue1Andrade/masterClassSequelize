const PostService = require('../../service/post.js');

module.exports = {
    async index(req, res) {
        const { post_id } = req.params;

        try {
            const post = await PostService.getPostById(post_id);
            return res.json(post);
        } catch (e) {
            console.log("🚀 ~ index ~ e:", e);
            return res.status(400).json({ error: e.message });
        }
    },
};
