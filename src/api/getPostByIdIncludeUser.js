const Post = require('../models/Post.js');
const User = require('../models/User.js'); 

module.exports = {
    async index(req, res) {
        const { post_id } = req.params;

        try {
            const post = await Post.findOne({
                where: {
                    id: post_id,
                    is_deleted: false
                },
                include: [
                    {
                        model: User,
                        as: 'user', 
                        attributes: ['name', 'profile_img']
                    }
                ]
            });

            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }

            return res.json(post); 
        } catch (e) {
            console.log("🚀 ~ update ~ e:", e);
            return res.status(400).json({ error: 'Erro ao buscar o post' });
        }
    },
};
