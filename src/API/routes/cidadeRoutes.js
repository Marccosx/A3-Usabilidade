const express = require('express');
const router = express.Router();
const CidadeController = require('../controllers/cidadeController');

router.get('/' , CidadeController.list);
router.post('/create', CidadeController.create);
router.put('/edit/:id', CidadeController.edit);
router.delete('/delete/:id', CidadeController.delete);
router.get('/estado/:id_estado', CidadeController.listarCidadePorEstado);
router.get('/search/:id', CidadeController.show);

module.exports = router;