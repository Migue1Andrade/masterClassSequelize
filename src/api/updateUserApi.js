const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 

module.exports = {
    async updateUser(req, res) {
        const { user_id } = req.params; 
        const { name, email, currentPassword, newPassword } = req.body; 

        try {
            const user = await User.findByPk(user_id);
            console.log("🚀 ~ updateUser ~ user:", user)
            
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
            
            if (email && email !== user.email) {
                const emailExists = await User.findOne({ where: { email } });

                if (emailExists) return res.status(400).json({ error: 'Email já está em uso por outro usuário' });
            }
            
            if (currentPassword) {
                const passwordMatch = await bcrypt.compare(currentPassword, user.password);

                if (!passwordMatch) return res.status(400).json({ error: 'Senha atual incorreta' });
            }
            
            if (name) user.name = name;
            if (email) user.email = email;
            
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                
                user.password = await bcrypt.hash(newPassword, salt);
            }
            
            await user.save();

            return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);

            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
};
