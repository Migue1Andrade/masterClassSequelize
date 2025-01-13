const Post = require('../models/Post.js');

module.exports = {
    async increment(req, res) {
        try {
            const postId = req.body.postId; 

            if (!postId) {
                return res.status(400).json({ error: 'postId is required' });
            }

            const post = await Post.findByPk(postId);

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            await post.increment('likes');

            return res.status(200).json({ message: 'Likes incremented successfully', likes: post.likes });

        } catch (error) {
            console.error("Error incrementing likes:", error);
            return res.status(500).json({ error: 'Failed to increment likes' });
        }
    },
    async decrement(req, res) {
        try {
            const postId = req.body.postId;

            if (!postId) {
                return res.status(400).json({ error: 'postId is required' });
            }

            const post = await Post.findByPk(postId);

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (post.likes <= 0) {
                return res.status(400).json({ error: 'Likes cannot be negative' });
            }

            await post.decrement('likes');

            return res.status(200).json({ message: 'Likes decremented successfully', likes: post.likes });

        } catch (error) {
            console.error("Error decrementing likes:", error);
            return res.status(500).json({ error: 'Failed to decrement likes' });
        }
    }
};