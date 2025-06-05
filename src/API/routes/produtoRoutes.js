const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');

router.get('/', ProdutoController.list);
router.post('/create', ProdutoController.create);
router.get('/search/:id', ProdutoController.buscarProdutosPorID);
router.put('/edit/:id', ProdutoController.edit);
router.delete('/delete/:id', ProdutoController.delete);
router.get('/restaurante/:id_restaurante', ProdutoController.buscarProdutosPorRestaurante);

module.exports = router;