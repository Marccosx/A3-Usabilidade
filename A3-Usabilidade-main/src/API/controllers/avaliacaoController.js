const db = require('../config');

const avaliacaoController = {
    // Listar avaliações de um restaurante
    listarAvaliacoes: async (req, res) => {
        try {
            const { restauranteId } = req.params;
            const query = 'SELECT * FROM avaliacoes WHERE restaurante_id = ?';
            const [avaliacoes] = await db.execute(query, [restauranteId]);
            
            res.json({
                success: true,
                data: avaliacoes
            });
        } catch (error) {
            console.error('Erro ao listar avaliações:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar avaliações'
            });
        }
    },

    // Criar uma nova avaliação
    criarAvaliacao: async (req, res) => {
        try {
            const { restauranteId } = req.params;
            const { nome, avaliacao, comentario, data } = req.body;
            
            const query = 'INSERT INTO avaliacoes (restaurante_id, nome, avaliacao, comentario, data) VALUES (?, ?, ?, ?, ?)';
            const [result] = await db.execute(query, [restauranteId, nome, avaliacao, comentario, data]);
            
            res.json({
                success: true,
                data: {
                    id: result.insertId,
                    restaurante_id: restauranteId,
                    nome,
                    avaliacao,
                    comentario,
                    data
                }
            });
        } catch (error) {
            console.error('Erro ao criar avaliação:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao criar avaliação'
            });
        }
    },

    // Deletar uma avaliação
    deletarAvaliacao: async (req, res) => {
        try {
            const { restauranteId, avaliacaoId } = req.params;
            
            const query = 'DELETE FROM avaliacoes WHERE id = ? AND restaurante_id = ?';
            const [result] = await db.execute(query, [avaliacaoId, restauranteId]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Avaliação não encontrada'
                });
            }
            
            res.json({
                success: true,
                message: 'Avaliação deletada com sucesso'
            });
        } catch (error) {
            console.error('Erro ao deletar avaliação:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao deletar avaliação'
            });
        }
    }
};

module.exports = avaliacaoController; 