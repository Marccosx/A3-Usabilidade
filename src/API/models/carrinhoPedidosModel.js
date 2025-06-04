const db = require('../databases/connection');


const carrinhoPedidosModel ={

    create: (carrinhoPedido, callback) => {
        const { id_pedido, id_produto, quantidade, precoUnitario, precoTotal, obeservacao } = carrinhoPedido;

        if (!id_pedido || !id_produto || !quantidade || !precoUnitario || !precoTotal) {
            return callback(new Error('Todos os campos são obrigatórios'));
        }

        db.run(
            `INSERT INTO item_pedido (id_pedido, id_produto, quantidade, precoUnitario, precoTotal, obeservacao) VALUES (?, ?, ?, ?, ?, ?)`,
            [id_pedido, id_produto, quantidade, precoUnitario, precoTotal, obeservacao],
            function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, { id: this.lastID });
            }
        );
    },

    list:(callback)=>{
        db.all(
            `SELECT * FROM item_pedido`,
            [],
            (err, rows) => {
                if (err) {
                    return callback(err);
                }
                callback(null, rows);
            }
        );
    },

    edit:(id, carrinhoPedido, callback)=>{
        const {quantidade, precoUnitario, precoTotal, obeservacao} = carrinhoPedido;

        if(!quantidade || !precoUnitario || !precoTotal) {
            return callback(new Error('Todos os campos são obrigatórios'));
        }

        db.run(
            `UPDATE item_pedido SET quantidade = ?, precoUnitario = ?, precoTotal = ?, obeservacao = ? WHERE id = ?`,
            [quantidade, precoUnitario, precoTotal, obeservacao, id],
            function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null, { changes: this.changes });
            }
        );
    },

    delete:(id, callback)=>{
        db.run(
            `DELETE FROM item_pedido WHERE id = ?`,
            [id],
            function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null, { changes: this.changes });
            }
        );
    },

}
module.exports = carrinhoPedidosModel;