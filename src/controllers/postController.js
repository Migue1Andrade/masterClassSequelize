const Post = require('../models/Post.js');

module.exports = {
    async store( req, res) {
        console.log("🚀 ~ store ~ req:", req.body);
        const { user_id, title, text, summary, post_like } = req.body;

        try {
            const post = await Post.create({ user_id: user_id, title: title, text: text, summary: summary, post_like: post_like});

            return res.json(post);
        } catch(e) {
            return res.status(500).json({error: 'Erro ao criar o post'});
        }
    },

    async update( req, res) {
        const { id } = req.params;
        const { user_id, title, text, summary} = req.body;
            
        try {
            const post = await Post.findByPk(id);

            if(!post) return res.status(404).json({error: 'Post nao econtrado'});

            await post.update({user_id: user_id, title: title, text: text, summary: summary});

            return res.json(post);
        } catch(e) {
            console.log("🚀 ~ update ~ e:", e)

            return res.status(500).json({error: 'Erro ao atualizar o post'});
        }
    },

    async delete(req, res) {
        const { id, user_id } = req.query;

        console.log(req.query);

        try {   
            const post = await Post.findOne({
                where: {
                    id,
                    user_id
                }
            }); 
            
            console.log(post);

            if(!post) res.status(404).json({error: 'Post nao encontrado'});

            await post.destroy();

            return res.status(204).json('post deletado com sucesso');
        }catch(e) {
            console.log("🚀 ~ update ~ e:", e)

            return res.status(500).json({error: 'Erro ao deletar o post'});
        }
    }
}