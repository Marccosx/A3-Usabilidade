const cidadeModel = require('../models/cidadeModel');

const cidadeController = {

    create: async(req, res)=>{
        const {nome, id_estado} = req.body;

        if(!nome || !id_estado){
            return res.status(400).json({erro: "Todos os campos são obrigatórios"})
        }

        cidadeModel.buscarCidadePorId(id, async(err, cidadeExistente)=>{
            if (cidadeExistente) {
        return res.status(400).json({ erro: 'cidade já cadastrada.' });
        }
        })
        cidadeModel.create({nome,id_estado}, (err)=>{
            if (err) {
            return res.status(500).json({ erro: 'Erro ao cadastrar cidade.', detalhe: err.message });
            }
            res.status(201).json({ mensagem: 'Cidade cadastrado com sucesso!' });
        });
    },

    show: async (req, res) => {
        cidadeModel.list((err, cidades) => {
            if (err) return res.status(500).json({ erro: 'Erro ao listar as cidades.', detalhe: err.message });
            res.status(200).json(cidades);
        });
    },

    edit: async (req, res) => {
        const { id, nome, id_estado } = req.body;

        if (!id || !nome || !id_estado) {
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
    }
};

module.exports = cidadeController;