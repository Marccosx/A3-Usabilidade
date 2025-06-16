const restauranteModel = require('../models/restauranteModel');


const restauranteController = {
    create:(req, res) => {
        const { nome, taxaFrete, ativo, aberto, foto, id_endereco } = req.body;

        if (!nome ){
            return res.status(400).json({ erro: 'Campo nome é obrigatório.' });
        } if(!taxaFrete ){
            return res.status(400).json({ erro: 'Campo taxa de frete é obrigatório.' });
        }if( ativo === undefined) {
            return res.status(400).json({ erro: 'Campo ativo é obrigatório.' });}
            if(aberto === undefined){
                return res.status(400).json({ erro: 'Campo aberto é obrigatório.' });
            } if(!id_endereco) {
            return res.status(400).json({ erro: 'Campo id_endereco é obrigatório.' });
        }

        restauranteModel.buscarRestaurantePorNome(nome, (err, restauranteExistente) => {
            if (restauranteExistente) {
                return res.status(400).json({ erro: 'Restaurante já cadastrado.' });
            }

            restauranteModel.create({ nome, taxaFrete, ativo, aberto, foto, id_endereco }, (err) => {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao cadastrar restaurante.', detalhe: err.message });
                }
                res.status(201).json({ mensagem: 'Restaurante cadastrado com sucesso!' });
            });
        });
    },
    edit:(req, res) => {
        const id = req.params.id;
        const { nome, taxaFrete, ativo, aberto, foto, id_endereco } = req.body;

        if (!nome || taxaFrete === undefined || ativo === undefined  || aberto === undefined  ||  !id_endereco) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        restauranteModel.buscarRestaurantePorId(id, (err, restauranteExistente) => {
            if (!restauranteExistente) {
                return res.status(404).json({ erro: 'Restaurante não encontrado.' });
            }

            restauranteModel.edit(id, { nome, taxaFrete, ativo, aberto, foto, id_endereco }, (err) => {
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

    listarRestauranteporUsuario:(req, res)=>{
        const id_usuario = req.params.id_usuario;

        if(!usuario){
            return res.status(404).json({erro:'Insira od id do usuario'});
        }
        restauranteModel.buscarRestaurantePorUsuario(id_usuario,(err, restaurantes)=>{
            if(err){
                return res.status(500).json({erro: 'Erro ao listar restaurantes.', detalhe: err.message});
            }
            res.status(200).json(restaurantes);
        });
    },

    listarRestauranteporID:(req, res)=>{
        const id = req.params.id;

        if(!id) {
            return res.status(404).json({erro:'Insira o id do restaurante.'});
        }

        restauranteModel.buscarRestaurantePorId(id, (err, restaurante)=>{
            if(err){
                return res.status(500).json({erro:'Erro ao buscar restaurante', detalhe: err.message});
            }
            if(!restaurante){
                return res.status(404).json({erro: 'Restaurante não encontrado'});
            }
            res.status(200).json(restaurante);
        })
    },

    listarRestauranteporNome:(req, res)=>{
        const nome = req.params.nome;

        if(!nome) {
            return res.status(404).json({erro:'Insira o id do restaurante.'});
        }

        restauranteModel.buscarRestaurantePorNome(nome, (err, restaurante)=>{
            if(err){
                return res.status(500).json({erro:'Erro ao buscar restaurante', detalhe: err.message});
            }
            if(!restaurante){
                return res.status(404).json({erro: 'Restaurante não encontrado'});
            }
            res.status(200).json(restaurante);
        })
    },

    listarAvaliacaoes: (req, res)=>{
        const id_restaurante = req.params.id_restaurante;

        if(!id_restaurante){
            return res.status(400).json({erro: 'Restaurante não encontrado'})
        }
        restauranteModel.listarAvaliacaoes(id_restaurante,(err, avaliacoes)=>{
           if(err){
            return res.status(500).json({erro: 'Erro ao buscar restaurante', detalhe: err.message});
           }if(!avaliacoes){
            return res.status(404).json({erro: 'Avaliações não encontradas' });
           }
           res.status(200).json(avaliacoes);
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