const db = require('../databases/connection');

// Criar um novo restaurante
exports.criarRestaurante = async (req, res) => {
    try {
        const { nome, descricao, taxaFrete, ativo, aberto, foto_perfil } = req.body;
        
        const sql = `INSERT INTO restaurante (nome, descricao, taxaFrete, ativo, aberto, foto_perfil, dataCadastro, dataAtualizacao) 
                     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        
        db.run(sql, [nome, descricao, taxaFrete, ativo ? 1 : 0, aberto ? 1 : 0, foto_perfil], function(err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            res.status(201).json({
                success: true,
                data: {
                    id: this.lastID,
                    nome,
                    descricao,
                    taxaFrete,
                    ativo,
                    aberto,
                    foto_perfil
                }
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Listar todos os restaurantes
exports.listarRestaurantes = async (req, res) => {
    try {
        const sql = `SELECT id, nome, descricao, taxaFrete, ativo, aberto, foto_perfil, dataCadastro, dataAtualizacao 
                     FROM restaurante 
                     WHERE ativo = 1`;
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            // Converter os valores booleanos do SQLite (0/1) para boolean do JavaScript
            const restaurantes = rows.map(row => ({
                ...row,
                ativo: row.ativo === 1,
                aberto: row.aberto === 1,
                taxaFrete: parseFloat(row.taxaFrete) // Garantir que é um número
            }));
            
            res.status(200).json({
                success: true,
                data: restaurantes
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Buscar um restaurante específico
exports.buscarRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT id, nome, descricao, taxaFrete, ativo, aberto, foto_perfil, dataCadastro, dataAtualizacao 
                     FROM restaurante 
                     WHERE id = ? AND ativo = 1`;
        
        db.get(sql, [id], (err, row) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            if (!row) {
                return res.status(404).json({
                    success: false,
                    message: 'Restaurante não encontrado'
                });
            }
            
            // Converter os valores booleanos do SQLite (0/1) para boolean do JavaScript
            const restaurante = {
                ...row,
                ativo: row.ativo === 1,
                aberto: row.aberto === 1,
                taxaFrete: parseFloat(row.taxaFrete)
            };
            
            res.status(200).json({
                success: true,
                data: restaurante
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Atualizar um restaurante
exports.atualizarRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, taxaFrete, aberto, foto_perfil } = req.body;
        
        const sql = `UPDATE restaurante 
                     SET nome = ?, 
                         descricao = ?,
                         taxaFrete = ?,
                         aberto = ?,
                         foto_perfil = ?,
                         dataAtualizacao = CURRENT_TIMESTAMP 
                     WHERE id = ? AND ativo = 1`;
        
        db.run(sql, [nome, descricao, taxaFrete, aberto ? 1 : 0, foto_perfil, id], function(err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Restaurante não encontrado'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Restaurante atualizado com sucesso'
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Deletar um restaurante (soft delete)
exports.deletarRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `UPDATE restaurante 
                     SET ativo = 0,
                         dataAtualizacao = CURRENT_TIMESTAMP 
                     WHERE id = ? AND ativo = 1`;
        
        db.run(sql, [id], function(err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Restaurante não encontrado'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Restaurante deletado com sucesso'
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 