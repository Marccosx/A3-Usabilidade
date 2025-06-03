const db = require('../databases/connection');

// Criar um novo produto
exports.criarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco, imagem, id_restaurante } = req.body;
        
        const sql = `INSERT INTO produto (nome, descricao, preco, imagem, id_restaurante) 
                     VALUES (?, ?, ?, ?, ?)`;
        
        db.run(sql, [nome, descricao, preco, imagem, id_restaurante], function(err) {
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
                    preco,
                    imagem,
                    id_restaurante
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

// Listar produtos de um restaurante
exports.listarProdutosPorRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID do restaurante não fornecido'
            });
        }

        const sql = `
            SELECT p.id, p.nome, p.descricao, p.preco, p.imagem, p.id_restaurante,
                   r.nome as restaurante_nome
            FROM produto p
            LEFT JOIN restaurante r ON p.id_restaurante = r.id
            WHERE p.id_restaurante = ?`;
        
        db.all(sql, [id], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar produtos:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar produtos'
                });
            }

            if (!rows || rows.length === 0) {
                return res.status(200).json({
                    success: true,
                    data: [],
                    message: 'Nenhum produto encontrado para este restaurante'
                });
            }

            return res.status(200).json({
                success: true,
                data: rows,
                message: 'Produtos encontrados com sucesso'
            });
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao listar produtos'
        });
    }
};

// Buscar um produto específico
exports.buscarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT id, nome, descricao, preco, imagem, id_restaurante 
                     FROM produto 
                     WHERE id = ?`;
        
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
                    message: 'Produto não encontrado'
                });
            }
            
            res.status(200).json({
                success: true,
                data: {
                    ...row,
                    preco: parseFloat(row.preco)
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

// Atualizar um produto
exports.atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, imagem } = req.body;
        
        const sql = `UPDATE produto 
                     SET nome = ?, 
                         descricao = ?,
                         preco = ?,
                         imagem = ?
                     WHERE id = ?`;
        
        db.run(sql, [nome, descricao, preco, imagem, id], function(err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Produto não encontrado'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Produto atualizado com sucesso'
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Deletar um produto
exports.deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM produto WHERE id = ?`;
        
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
                    message: 'Produto não encontrado'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Produto deletado com sucesso'
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
    try {
        const sql = `
            SELECT p.id, p.nome, p.descricao, p.preco, p.imagem, p.id_restaurante,
                   r.nome as restaurante_nome
            FROM produto p
            LEFT JOIN restaurante r ON p.id_restaurante = r.id`;
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar produtos:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar produtos'
                });
            }

            if (!rows || rows.length === 0) {
                return res.status(200).json({
                    success: true,
                    data: [],
                    message: 'Nenhum produto encontrado'
                });
            }

            // Converter os valores numéricos
            const produtos = rows.map(row => ({
                ...row,
                preco: parseFloat(row.preco)
            }));

            return res.status(200).json({
                success: true,
                data: produtos,
                message: 'Produtos encontrados com sucesso'
            });
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao listar produtos'
        });
    }
}; 