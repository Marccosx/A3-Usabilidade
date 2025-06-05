const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');


router.get('/:id_restaurante/', avaliacaoController.listarAvaliacaoes);
router.post('/:id_restaurante/create/', avaliacaoController.create);
router.put('/:id_restaurante/edit/:id', avaliacaoController.edit);
router.delete('/:id_restaurante/delete/:id', avaliacaoController.delete);
router.get('/', avaliacaoController.listarTodas);

module.exports=router;
