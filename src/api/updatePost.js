const Post = require('../models/Post.js');

module.exports = { 
	async update( req, res) {
		const { post_id } = req.params;
        const { title, text, summary, postImg} = req.body;
			
		try {
			const post = await Post.findByPk(post_id);

			if(!post) return res.status(404).json({error: 'Post nao econtrado'});

			await post.update({title, text, summary, postImg});

			return res.json(post);
		} catch(e) {
			console.log("🚀 ~ update ~ e:", e)
			return res.status(400).json({error: 'Erro ao atualizar o post'});
		}
	}
}