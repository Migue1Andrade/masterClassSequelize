const PostService = require('../../service/post.js');

module.exports = {
	async delete(req, res) { 
		const { userId, postId } = req.params;

		try {
			const response = await PostService.deletePost(userId, postId);
			return res.status(200).json(response);
		} catch (error) {
			console.error("🚀 ~ delete ~ error:", error);
			return res.status(400).json({ error: error.message });
		}
	}
};
