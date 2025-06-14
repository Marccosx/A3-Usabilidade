const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.post('/cadastro', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.listarTodos);
router.get('/:id', UsuarioController.buscarPorId);

module.exports = router;