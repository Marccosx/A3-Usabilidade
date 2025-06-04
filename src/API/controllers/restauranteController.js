const restauranteModel = require('../models/restauranteModel');
const { edit } = require('./cidadeController');
const { list } = require('./enderecoController');

const restauranteController = {
    create:(req, res) => {
        const { nome, taxaFrete, ativo, aberto, avaliacao, foto, id_endereco } = req.body;

        if (!nome || !taxaFrete || !ativo || !aberto || !avaliacao || !foto || !id_endereco) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        restauranteModel.buscarRestaurantePorNome(nome, (err, restauranteExistente) => {
            if (restauranteExistente) {
                return res.status(400).json({ erro: 'Restaurante já cadastrado.' });
            }

            restauranteModel.create({ nome, taxaFrete, ativo, aberto, avaliacao, foto, id_endereco }, (err) => {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao cadastrar restaurante.', detalhe: err.message });
                }
                res.status(201).json({ mensagem: 'Restaurante cadastrado com sucesso!' });
            });
        });
    },
    edit:(req, res) => {
        const id = req.params.id;
        const { nome, taxaFrete, ativo, aberto, avaliacao, foto, id_endereco } = req.body;

        if (!nome || taxaFrete === undefined || ativo === undefined  || aberto === undefined  || !avaliacao || !foto || !id_endereco) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        restauranteModel.buscarRestaurantePorId(id, (err, restauranteExistente) => {
            if (!restauranteExistente) {
                return res.status(404).json({ erro: 'Restaurante não encontrado.' });
            }

            restauranteModel.edit(id, { nome, taxaFrete, ativo, aberto, avaliacao, foto, id_endereco }, (err) => {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao editar restaurante.', detalhe: err.message });
                }
                res.status(200).json({ mensagem: 'Restaurante editado com sucesso!' });
            });
        });
    },

    list:(req, res)=>{
        restauranteModel.list((err, restaurantes )=>{
            if(err){
                return res.status(500).json({erro: 'Erro ao listar restaurantes.', detalhe: err.message});
            }
            res.status(200).json(restaurantes);
        })
    },

    filtro:(req, res) => {
        const { nome } = req.query;

        if (!nome) {
            return res.status(400).json({ erro: 'O parâmetro "nome" é obrigatório.' });
        }

        restauranteModel.buscarRestaurantePorNome(nome, (err, restaurante) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao buscar restaurante.', detalhe: err.message });
            }
            if (!restaurante) {
                return res.status(404).json({ erro: 'Restaurante não encontrado.' });
            }
            res.status(200).json(restaurante);
        });
    },

    delete:(req, res) => {
        const id = req.params.id;

        restauranteModel.buscarRestaurantePorId(id, (err, restauranteExistente) => {
            if (!restauranteExistente) {
                return res.status(404).json({ erro: 'Restaurante não encontrado.' });
            }

            restauranteModel.delete(id, (err) => {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao deletar restaurante.', detalhe: err.message });
                }
                res.status(200).json({ mensagem: 'Restaurante deletado com sucesso!' });
            });
        });
    }
    
}

module.exports = restauranteController;