const Post = require('../models/Post');

module.exports = { 
	async delete(req, res) { 
		const userId = req.params.userId; 
		const postId = req.params.postId;
		
		try {
			const post = await Post.findOne({ 
				where: {
					id: postId,
					user_id: userId,
					is_deleted: false 
				}
			});
			
			if (!post) {
				return res.status(400`  `).json({ error: 'Post not found' });
			}

			const update = await Post.update({ 
				is_deleted: true 
			}, 
			{ 
				where: {
					id: postId,
					user_id: userId
				} 
			});
			console.log(update, "update");

			return res.status(200).json({ message: 'Post deleted successfully' });
		} catch (error) {
			console.error("🚀 ~ delete ~ error:", error);
			return res.status(500).json({ error: 'An error occurred while deleting the post' });
		}
	}
}
