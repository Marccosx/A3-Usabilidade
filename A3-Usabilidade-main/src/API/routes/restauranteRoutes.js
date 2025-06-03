const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');
const avaliacaoController = require('../controllers/avaliacaoController');
const produtoController = require('../controllers/produtoController');

// Rotas para restaurantes
router.post('/', restauranteController.criarRestaurante);
router.get('/', restauranteController.listarRestaurantes);
router.get('/:id', restauranteController.buscarRestaurante);
router.put('/:id', restauranteController.atualizarRestaurante);
router.delete('/:id', restauranteController.deletarRestaurante);

// Rotas para avaliações
router.get('/:restauranteId/avaliacoes', avaliacaoController.listarAvaliacoes);
router.post('/:restauranteId/avaliacoes', avaliacaoController.criarAvaliacao);
router.delete('/:restauranteId/avaliacoes/:avaliacaoId', avaliacaoController.deletarAvaliacao);

// Rotas para produtos do restaurante
router.get('/:id/produtos', produtoController.listarProdutosPorRestaurante);

module.exports = router; 