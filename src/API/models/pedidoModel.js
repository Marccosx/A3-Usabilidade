const db = require('../databases/connection');

const pedidoModel = {

    create: (pedido, callback) => {
        const { codigo, subtotal, taxaFrete, valorTotal, dataEntrega, dataCancelamento, id_usuario, id_restaurante, id_forma_pagamento, id_status } = pedido;
        if (!codigo || !subtotal || !taxaFrete || !valorTotal || !id_usuario || !id_restaurante || !id_forma_pagamento || !id_status) {
            return callback(new Error('Todos os campos são obrigatórios'));
        }

        pedidoModel.listarPedidosPorCodigo(codigo, (err, rows) => {
            if (err) return callback(err);
            if (rows.length > 0) {
                return callback(new Error('Pedido já existe com este código'));
            }
            db.run(
                `INSERT INTO pedido (codigo, subtotal, taxaFrete, valorTotal, dataEntrega, dataCancelamento, id_usuario, id_restaurante, id_forma_pagamento, id_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [codigo, subtotal, taxaFrete, valorTotal, dataEntrega, dataCancelamento, id_usuario, id_restaurante, id_forma_pagamento, id_status],
                function (err) {
                    if (err) return callback(err);
                    callback(null, { id: this.lastID });
                }
            );
        });
    },

    listarPedidosPorCodigo: (codigo, callback) => {
        db.all(`SELECT * FROM pedido WHERE codigo = ?`, [codigo], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    },

    listarPedidosPorRestaurante: (id_restaurante, callback) => {
        db.all(`SELECT * FROM pedido WHERE id_restaurante = ?`, [id_restaurante], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    },

    listarPedidosPorUsario: (id_usuario, callback) => {
        db.all(`SELECT * FROM pedido WHERE id_usuario = ?`, [id_usuario], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    },

    listarPedidosPorId: (id, callback) => {
        db.all(`
            SELECT 
                pedido.*,
                usuario.nome AS usuario_nome,
                restaurante.nome AS restaurante_nome,
                forma_pagamento.descricao AS forma_pagamento_nome,
                status_pedido.nome AS status_pedido_nome,
                GROUP_CONCAT(
                    json_object(
                        'id', item_pedido.id,
                        'id_produto', item_pedido.id_produto,
                        'quantidade', item_pedido.quantidade,
                        'precoUnitario', item_pedido.precoUnitario,
                        'precoTotal', item_pedido.precoTotal,
                        'observacao', item_pedido.obeservacao
                    )
                ) as itens
            FROM pedido 
            JOIN usuario ON pedido.id_usuario = usuario.id 
            JOIN restaurante ON pedido.id_restaurante = restaurante.id 
            JOIN forma_pagamento ON pedido.id_forma_pagamento = forma_pagamento.id 
            JOIN status_pedido ON pedido.id_status = status_pedido.id
            LEFT JOIN item_pedido ON pedido.id = item_pedido.id_pedido
            WHERE pedido.id = ?
            GROUP BY pedido.id`, [id], (err, rows) => {
            if (err) return callback(err);
            // Processar os itens do pedido
            rows = rows.map(row => {
                if (row.itens) {
                    row.itens = JSON.parse('[' + row.itens + ']');
                } else {
                    row.itens = [];
                }
                return row;
            });
            callback(null, rows);
        });
    },

    edit: (id, pedido, callback) => {
        const { codigo, subtotal, taxaFrete, valorTotal, dataEntrega, dataCancelamento, id_usuario, id_restaurante, id_forma_pagamento, id_status } = pedido;

        db.run(`UPDATE pedido SET codigo=?, subtotal=?, taxaFrete=?, valorTotal=?, dataEntrega=?, dataCancelamento=?, id_usuario=?, id_restaurante=?, id_forma_pagamento=?, id_status=? WHERE id=?`, [codigo, subtotal, taxaFrete, valorTotal, dataEntrega, dataCancelamento, id_usuario, id_restaurante, id_forma_pagamento, id_status, id], function (err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM pedido WHERE id=?`, [id], function (err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    },

    list: (callback) => {
        db.all(`SELECT pedido.id, pedido.codigo, pedido.subtotal, pedido.taxaFrete, pedido.valorTotal, pedido.dataCriacao, pedido.dataEntrega, pedido.dataCancelamento, 
                usuario.nome AS usuario_nome, restaurante.nome AS restaurante_nome, forma_pagamento.descricao AS forma_pagamento_nome, status_pedido.nome AS status_pedido_nome 
                FROM pedido 
                JOIN usuario ON pedido.id_usuario = usuario.id 
                JOIN restaurante ON pedido.id_restaurante = restaurante.id 
                JOIN forma_pagamento ON pedido.id_forma_pagamento = forma_pagamento.id 
                JOIN status_pedido ON pedido.id_status = status_pedido.id`, (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    }

}

module.exports = pedidoModel;