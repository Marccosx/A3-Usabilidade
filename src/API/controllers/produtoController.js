const produtoModel = require('../models/produtoModel');

const produtoController = {

    create:(req, res)=>{
        const produto = req.body;

        produtoModel.create(produto, (err, result)=>{
            if(err){
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ message: 'Produto criado com sucesso', produto: result });
        });
    },

    list:(req, res)=>{
        produtoModel.list((err,produtos)=>{
            if(err){
                return res.status(500).json({ error: 'Erro ao listar produtos' });
            }
            res.status(200).json(produtos);
        })
    },

    buscarProdutosPorID:(req, res)=>{
        const id = req.params.id;

        produtoModel.buscarProdutosPorID(id, (err, produto)=>{
            if(err){
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.status(200).json(produto);
        });
    },	

    edit:(req, res)=>{
        const id = req.params.id;
        const produto = req.body;

        produtoModel.edit(id, produto, (err, result)=>{
            if(err){
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Produto atualizado com sucesso', produto: result });
        });
    },

    delete:(req, res)=>{
        const id = req.params.id;

        produtoModel.delete(id, (err, result)=>{
            if(err){
                return res.status(400).json({ error: 'Erro ao deletar produto' });
            }
            res.status(200).json({ message: 'Produto deletado com sucesso', result });
        });
    }
}
module.exports = produtoController;