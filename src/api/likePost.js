const Like = require('../models/PostLikes');
const Post = require('../models/Post');

module.exports = {
    async like(req, res) {
        try {
            const { post_id } = req.params;
            const { user_id } = req.params;

            const post = await Post.findByPk(post_id);

            if (!post) return res.status(404).json({ error: 'Post não encontrado' });

            const [existingLike, created] = await Like.findOrCreate({
                where: {
                    user_id,
                    post_id
                }
            });

            if (!created) {

                if (existingLike.is_deleted === false) {
                    existingLike.is_deleted = true;

                    if (post.likes > 0) post.likes -= 1; 
                } else {
                    existingLike.is_deleted = false;
                    post.likes += 1;
                }

                await existingLike.save();
                await post.save();

                return res.status(200).json({
                    message: 'Like atualizado com sucesso!',
                    post_id: post.id,
                    likes: post.likes,
                    is_deleted: existingLike.is_deleted,
                });
            } else {
                existingLike.is_deleted = false;
                post.likes += 1; 
                
                await existingLike.save();
                await post.save();

                return res.status(201).json({
                    message: 'Like registrado com sucesso!',
                    post_id: post.id,
                    likes: post.likes,
                    is_deleted: existingLike.is_deleted,
                });
            }
        } catch (error) {
            console.error('Erro ao registrar like:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};
