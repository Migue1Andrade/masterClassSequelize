const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const posts = await Post.findAll({
                where: {
                    user_id: req.params.user_id
                },
                include: { 
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email', 'profile_img']
                }
            });
            return res.json(posts);
        } catch (e) {
            console.log(e);
            return res.status(401).json({ error: 'Error on get posts' });
        }
    }
};
