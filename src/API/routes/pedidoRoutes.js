const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

router.get('/', pedidoController.listarPedidos);
router.get('/search/restaurante/:id_restaurante', pedidoController.listarPedidosPorRestaurante);
router.get('/search/codigo/:codigo', pedidoController.listarPedidosPorCodigo);
router.get('/search/usuario/:id_usuario', pedidoController.listarPedidosPorUsuario);
router.get('/:id', pedidoController.listarPedidosPorId);
router.post('/create', pedidoController.create);
router.put('/edit/:id', pedidoController.edit);
router.delete('/delete/:id', pedidoController.delete);

module.exports = router;