const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.listarTodos);

module.exports = router;