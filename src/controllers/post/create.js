const PostService = require('../../service/post.js');

module.exports = {
    async store(req, res) {
        console.log("🚀 ~ store ~ req:", req.body);
        const { user_id } = req.params;

        try {
            const post = await PostService.createPost(user_id, req.body);
            return res.status(200).json({ message: 'Post criado com sucesso', post });
        } catch (e) {
            console.log("🚀 ~ store ~ e:", e);
            return res.status(400).json({ error: e.message });
        }
    }
}
