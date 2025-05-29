const enderecoModel = require('../models/enderecoModel');

const enderecoController = {
    create: (req, res) => {
        const { rua, numero, bairro, cep, complemento, id_cidade } = req.body;
        if (!rua || !numero || !bairro || !cep || !id_cidade) {
            return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }
        enderecoModel.create({ rua, numero, bairro, cep, complemento, id_cidade }, (err, result) => {
            if (err) return res.status(500).json({ erro: 'Erro ao cadastrar endereço.', detalhe: err.message });
            res.status(201).json({ mensagem: 'Endereço cadastrado com sucesso!', id: result.id });
        });
    },

    list: (req, res) => {
        enderecoModel.list((err, enderecos) => {
            if (err) return res.status(500).json({ erro: 'Erro ao listar endereços.', detalhe: err.message });
            res.status(200).json(enderecos);
        });
    },

    show: (req, res) => {
        const { id } = req.params;
        enderecoModel.buscarPorId(id, (err, endereco) => {
            if (err) return res.status(500).json({ erro: 'Erro ao buscar endereço.', detalhe: err.message });
            if (!endereco) return res.status(404).json({ erro: 'Endereço não encontrado.' });
            res.status(200).json(endereco);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { rua, numero, bairro, cep, complemento, id_cidade } = req.body;
        if (!rua || !numero || !bairro || !cep || !id_cidade) {
            return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }
        enderecoModel.update(id, { rua, numero, bairro, cep, complemento, id_cidade }, (err, result) => {
            if (err) return res.status(500).json({ erro: 'Erro ao atualizar endereço.', detalhe: err.message });
            res.status(200).json({ mensagem: 'Endereço atualizado com sucesso.' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        enderecoModel.delete(id, (err, result) => {
            if (err) return res.status(500).json({ erro: 'Erro ao deletar endereço.', detalhe: err.message });
            res.status(200).json({ mensagem: 'Endereço deletado com sucesso.' });
        });
    }
};

module.exports = enderecoController;