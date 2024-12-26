const PostLike = require('../models/PostLikes.js');

module.exports = {
	async store(res, req) {
		const {user_id, post_id} = req.body;

		try { 
			const like = await PostLike.create({user_id: user_id, post_id: post_id});

			return res.json(like);
		}catch(e) {
			console.log(e);
		}
	}
}

