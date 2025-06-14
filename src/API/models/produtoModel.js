const db = require('../databases/connection');


const produtoModel = {

    create: (produto, callback) => {
        const { nome, preco, descricao, id_restaurante, ativo, foto_produto, categoria } = produto;

        if (!nome) {
            return callback(new Error('O campo nome é obrigatório'));
        } if (!preco) {
            return callback(new Error('O campo preco é obrigatório'));
        } if (!descricao) {
            return callback(new Error('O campo descricao é obrigatório'));
        } if (!id_restaurante) {
            return callback(new Error('O campo id_restaurante é obrigatório'));
        } if (ativo === undefined) {
            return callback(new Error('O campo ativo é obrigatório'));
        } if (foto_produto === undefined) {
            return callback(new Error('O campo foto_produto é obrigatório'));
        } if (!categoria) {
            return callback(new Error('O campo categoria é obrigatório'));
        }

        db.run(
            `INSERT INTO produto (nome, preco, descricao, id_restaurante, ativo, foto_produto, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, preco, descricao, id_restaurante, ativo, foto_produto, categoria],
            function (err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
            });
    },

    buscarProdutosPorID: (id, callback) => {
        db.get(`SELECT * FROM produto WHERE id = ?`, [id], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        })
    },

    buscarProdutosPorRestaurante: (id_restaurante, callback) => {
        db.all(`SELECT * FROM produto WHERE id_restaurante = ?`, [id_restaurante], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    },

    edit: (id, produto, callback) => {
        const { nome, preco, descricao, id_restaurante, ativo, foto_produto, categoria } = produto;

        db.run(
            `UPDATE produto SET nome=?, preco=?, descricao=?, id_restaurante=?, ativo=?, foto_produto=?, categoria=? WHERE id=?`,
            [nome, preco, descricao, id_restaurante, ativo, foto_produto, categoria, id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );

    },

    delete: (id, callback) => {
        db.run(
            `DELETE FROM produto WHERE id=?`,
            [id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );

    },

    list: (callback) => {
        db.all(
            `SELECT produto.id, produto.nome, produto.preco, produto.descricao, 
                produto.ativo, produto.foto_produto, produto.categoria, 
                produto.id_restaurante, restaurante.nome AS restaurante_nome 
         FROM produto 
         JOIN restaurante ON produto.id_restaurante = restaurante.id`,
            [],
            (err, rows) => {
                if (err) return callback(err);
                callback(null, rows);
            }
        );

    },

}


module.exports = produtoModel;

