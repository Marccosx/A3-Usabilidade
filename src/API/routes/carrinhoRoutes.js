const express = require('express');
const router = express.Router();
const carrinhoPedidosController = require('../controllers/carrinhoPedidosController');

router.get('/', carrinhoPedidosController.list);
router.post('/create', carrinhoPedidosController.create);
router.put('/edit/:id', carrinhoPedidosController.edit);
router.delete('/delete/:id', carrinhoPedidosController.delete);

module.exports = router;