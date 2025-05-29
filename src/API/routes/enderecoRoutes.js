const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.post('/criar', enderecoController.create);
router.get('/', enderecoController.list);
router.get('/:id', enderecoController.show);
router.put('/editar/:id', enderecoController.update);
router.delete('/deletar/:id', enderecoController.delete);

module.exports = router;