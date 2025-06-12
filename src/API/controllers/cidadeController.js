const cidadeModel = require('../models/cidadeModel');

const cidadeController = {

    create: async (req, res) => {
        const { nome, id_estado } = req.body;

        if (!nome || !id_estado) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
        }

        cidadeModel.buscarCidadePorNomeEstado(id_estado, (err, cidadeExistente) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao buscar cidade.', detalhe: err.message });
            }
            if (cidadeExistente) {
                return res.status(400).json({ erro: 'Cidade já cadastrada.' });
            }

            // Só cria se não existir
            cidadeModel.create({ nome, id_estado }, (err, id) => {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao cadastrar cidade.', detalhe: err.message });
                }
                res.status(201).json({ id });
            });
        });
    },

     list: (req, res) => {
        enderecoModel.list((err, cidades) => {
            if (err) return res.status(500).json({ erro: 'Erro ao listar cidades.', detalhe: err.message });
            res.status(200).json(cidades);
        });
    },

    show: async (req, res) => {
        const {id} = req.params;
        cidadeModel.buscarCidadePorId(id,(err, cidade) => {
            if (err) return res.status(500).json({ erro: 'Erro ao listar as cidade.', detalhe: err.message });
            res.status(200).json(cidade);
        });
    },

    edit: async (req, res) => {
        const { nome, id_estado } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        cidadeModel.buscarCidadePorId(id, (err, cidadeExistente) => {
            if (err) return res.status(500).json({ erro: 'Erro ao buscar cidade.', detalhe: err.message });
            if (!cidadeExistente) {
                return res.status(400).json({ erro: 'Cidade não encontrada.' });
            }

            cidadeModel.update(id, nome, id_estado, (err) => {
                if (err) return res.status(500).json({ erro: 'Erro ao atualizar cidade.', detalhe: err.message });
                res.status(200).json({ mensagem: 'Cidade atualizada com sucesso.' });
            });
        });
    },

    delete: async (req, res) => {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ erro: 'O campo id é obrigatório.' });
        }

        cidadeModel.buscarCidadePorId(id, (err, cidadeExistente) => {
            if (err) return res.status(500).json({ erro: 'Erro ao buscar cidade.', detalhe: err.message });
            if (!cidadeExistente) {
                return res.status(404).json({ erro: 'Cidade não encontrada.' });
            }

            cidadeModel.delete(id, (err) => {
                if (err) return res.status(500).json({ erro: 'Erro ao deletar cidade.', detalhe: err.message });
                res.status(200).json({ mensagem: 'Cidade deletada com sucesso.' });
            });
        });
    },

    listarCidadePorEstado: async (req, res) => {
        const { id_estado } = req.params;
        cidadeModel.buscarCidadePorIDEstado(id_estado, (err, cidades) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.json(cidades);
        });
    }
};

module.exports = cidadeController;