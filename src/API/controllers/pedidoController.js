const pedidoModel = require('../models/pedidoModel');


const pedidoController = {

    create: (req, res) => {
        const pedido = req.body;

        if (!pedido.codigo || !pedido.subtotal || !pedido.taxaFrete || !pedido.valorTotal || !pedido.id_usuario || !pedido.id_restaurante || !pedido.id_forma_pagamento || !pedido.id_status) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        pedidoModel.create(pedido, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    listarPedidos: (req, res)=>{
        pedidoModel.list((err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    },

    listarPedidosPorRestaurante: (req, res)=>{
        const id_restaurante = req.params.id_restaurante;

        if (!id_restaurante) {
            return res.status(400).json({ error: 'ID do restaurante é obrigatório' });
        }

        pedidoModel.listarPedidosPorRestaurante(id_restaurante, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    },

    listarPedidosPorCodigo: (req, res)=>{
        const codigo = req.params.codigo; 
        if (!codigo) {
            return res.status(400).json({ error: 'Código do pedido é obrigatório' });
        }
        pedidoModel.listarPedidosPorCodigo(codigo, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    },

    edit: (req, res)=>{
        const id = req.params.id;
        const pedido = req.body;

        if (!pedido.codigo || !pedido.subtotal || !pedido.taxaFrete || !pedido.valorTotal || !pedido.id_usuario || !pedido.id_restaurante || !pedido.id_forma_pagamento || !pedido.id_status) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        pedidoModel.edit(id, pedido, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    delete: (req, res)=>{
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'ID do pedido é obrigatório' });
        }

        pedidoModel.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        });
    },

    list: (req, res) => { 
        pedidoModel.list((err, pedidos) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao listar pedidos' });
            }
            res.status(200).json(pedidos);
        });
    }


}

module.exports = pedidoController;