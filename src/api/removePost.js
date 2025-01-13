const Post = require('../models/Post.js');

module.exports = {
    async remove(req, res) {
        try{
            const userId  = req.params.userId;
            const postId =  req.params.postId;

            const post = await Post.findOne({
                where: {
                    user_id: userId,
                    id: postId
                },
            });

            const updateResult = await Post.update({ is_deleted: true }, { where: { id: post.id } });

            console.log('Update result:', updateResult);

            if (updateResult[0] === 0) {
                return res.status(400).send({ message: 'Failed to update the post.' });
            }
            else return res.status(200).send({ message: 'deletou com sucesso' });
        } catch(e) {
            console.log(e);
        };
    }
};
