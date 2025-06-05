const avaliacaoModel = require('../models/avaliacaoModel');

const avaliacaoController = {
    listarAvaliacaoes: (req, res) => {
        const id_restaurante = req.params.id_restaurante;
        if (!id_restaurante) {
            return res.status(400).json({ erro: 'Informe o id do restaurante.' });
        }
        avaliacaoModel.listarAvaliacaoes(id_restaurante, (err, avaliacoes) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(200).json(avaliacoes);
        });
    },

    listarTodas: (req, res) => {
        avaliacaoModel.listarTodas((err, avaliacoes) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(200).json(avaliacoes);
        });
    },

    buscarPorId: (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ erro: 'Informe o id da avaliação.' });
        }
        avaliacaoModel.buscarPorId(id, (err, avaliacao) => {
            if (err) return res.status(500).json({ erro: err.message });
            if (!avaliacao) return res.status(404).json({ erro: 'Avaliação não encontrada.' });
            res.status(200).json(avaliacao);
        });
    },

    create: (req, res) => {
        const id_restaurante = req.params.id_restaurante;
        const { nome, avaliacao, comentario } = req.body;
        if (!id_restaurante || !nome || !avaliacao) {
            return res.status(400).json({ erro: 'Campos obrigatórios não informados.' });
        }
        avaliacaoModel.create(id_restaurante, { nome, avaliacao, comentario }, (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ id: result.id });
        });
    },

    edit: (req, res) => {
        const id = req.params.id;
        const { nome, avaliacao, comentario } = req.body;
        if (!id || !nome || !avaliacao) {
            return res.status(400).json({ erro: 'Campos obrigatórios não informados.' });
        }
        avaliacaoModel.edit(id, { nome, avaliacao, comentario }, (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(200).json({ changes: result.changes });
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ erro: 'Informe o id da avaliação.' });
        }
        avaliacaoModel.delete(id, (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(200).json({ changes: result.changes });
        });
    }
};

module.exports = avaliacaoController;