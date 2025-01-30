const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const { user_id } = req.params;

            const user = await User.findByPk(user_id);

            return res.status(200).json(user);
        }catch(e){
            console.error(e);
            res.status(403).json({message: 'Erro ao buscar usuário'});
        }
    }
}