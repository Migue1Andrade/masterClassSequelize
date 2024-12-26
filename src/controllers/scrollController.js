const { Sequelize } = require('sequelize');

module.exports = {
	async pages(page) {
		try {
			const query = await sequelize.query(
				`SELECT * 
				FROM post
				WHERE available_at IS NOT NULL
				AND available_at <= CURRENT_TIMESTAMP
				ORDER BY available_at DESC
				LIMIT 5
				OFFSET :offset`,
				{
					replacements: { offset: (page - 1) * 5 }, 
					type: sequelize.QueryTypes.SELECT
				}
			);
			return query;
		} catch(erro) {
			console.error('Erro ao obter posts:', erro);
		}
	},

	async likes() {
		try {
			const query = await sequelize.query(
				`
					SELECT post_like
					FROM post
					WHERE post_like >= 0
					ORDER BY post_at
				`,
				{
					type: sequelize.QueryTypes.SELECT
				}
				);

				return query;
				
		} catch(erro) {
			console.log(erro, "erro");
		}
	},

	async postControllers(req, res) {
		const currentPage = parseInt(req.query.page) || 1; 
		try {
			const posts = await pages(currentPage);
			res.json(posts);
		} catch (erro) {
			res.status(500).send('Erro ao buscar postagens');
		}
	}
}