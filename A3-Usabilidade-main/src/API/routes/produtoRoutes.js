const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas para produtos
router.get('/', produtoController.listarProdutos);
router.post('/', produtoController.criarProduto);
router.get('/restaurante/:restauranteId', produtoController.listarProdutosPorRestaurante);
router.get('/:id', produtoController.buscarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.deletarProduto);

module.exports = router; 