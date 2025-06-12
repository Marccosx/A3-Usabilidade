const express = require('express');
const router = express.Router();
const EstadoController = require('../controllers/estadoController');

router.get('/', EstadoController.list); // Retorna todos os estados

module.exports = router;