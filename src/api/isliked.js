const Likes = require('../models/PostLikes.js')

module.exports = {
    async check(req, res) {
        const { postId, userId } = req.params;

        try {
    
            const existingLike = await Likes.findOne({
                where: {
                    post_id: postId,
                    user_id: userId,
                }
            });

    
            if (existingLike) {
                if (existingLike.is_deleted) {
            
                    existingLike.is_deleted = false;
                    await existingLike.save();

                    return res.json({ isLiked: true, message: 'Like adicionado novamente.' });
                } else {
            
                    existingLike.is_deleted = true;
                    await existingLike.save();

                    return res.json({ isLiked: false, message: 'Like removido com sucesso.' });
                }
            } else {
        
                await Likes.create({
                    post_id: postId,
                    user_id: userId,
                    is_deleted: false,
                });

                return res.json({ isLiked: true, message: 'Like adicionado com sucesso.' });
            }
        } catch (error) {
            console.error('Erro ao processar o like:', error);
            return res.status(500).json({ error: 'Erro ao processar o like.' });
        }
    }
};
