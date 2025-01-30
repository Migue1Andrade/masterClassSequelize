const Post = require('../models/Post.js');
const User = require('../models/User.js');

module.exports = {
  async index(req, res) {
    try {
      const data = await Post.findAll({
        where: {is_deleted: false},
        include: {
            model: User,
            as: 'user',
            attributes: ['name', 'profile_img'],
        }
      });

      if (data.length === 0) return res.status(204).json([]);
      
      return res.json(data);
    } catch (error) {
      console.log("🚀 ERRO É ESSE:", error);

      return res.status(500).json({
        error: 'Erro ao buscar dados do post',
      });
    }
  },
};