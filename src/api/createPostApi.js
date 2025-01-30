const Post = require('../models/Post.js');

    module.exports = {
	async store( req, res) {
		console.log("🚀 ~ store ~ req:", req.body);
		const { title, text, summary, post_img } = req.body;
        const { user_id } = req.params;

		try {
			const post = await Post.create({ 
                user_id, title, text, summary, post_img: post_img || 'https://placehold.co/600x400'
            });

			return res.status(200).json({ message: 'Post criado com sucesso', post });
		} catch(e) {
			console.log("🚀 ~ store ~ e:", e)
			return res.status(400).json({error: 'Erro ao criar o post'});
		}
	}
}