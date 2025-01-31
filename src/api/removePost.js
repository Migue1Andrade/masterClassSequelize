const Post = require('../models/Post');

module.exports = { 
    async delete(req, res) { 
        const userId = req.params.userId; 
        const postId = req.params.postId;
        
        try {
            
            const [rowsUpdated] = await Post.update({ 
                is_deleted: true 
            }, 
            { 
                where: {
                    id: postId,
                    user_id: userId,
                    is_deleted: false 
                },
                returning: true
            });
            
            if (rowsUpdated === 0) return res.status(404).json({ error: 'Post not found or already deleted' });

            return res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error("🚀 ~ delete ~ error:", error);
            return res.status(500).json({ error: 'An error occurred while deleting the post' });
        }
    }
}
