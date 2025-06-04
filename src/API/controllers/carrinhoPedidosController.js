const carrinhoPedidosModel = require('../models/carrinhoPedidosModel');

const carrinhoPedidosController = {
    create: (req, res) => {
        const carrinhoPedido = req.body;

        carrinhoPedidosModel.create(carrinhoPedido, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    list: (req, res) => {
        carrinhoPedidosModel.list((err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    },

    edit: (req, res) => {
        const id = req.params.id;
        const carrinhoPedido = req.body;

        carrinhoPedidosModel.edit(id, carrinhoPedido, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    delete: (req, res) => {
        const id = req.params.id;

        carrinhoPedidosModel.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    }
}
module.exports = carrinhoPedidosController;