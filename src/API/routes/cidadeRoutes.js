const express = require('express');
const router = express.Router();
const CidadeController = require('../controllers/cidadeController');

router.get('/' , CidadeController.show);
router.post('/create', CidadeController.create);
router.put('/editar/:id', CidadeController.edit);
router.delete('/deletar/:id', CidadeController.delete);

module.exports = router;