const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.post('/create', enderecoController.create);
router.get('/', enderecoController.list);
router.get('/search/:id', enderecoController.show);
router.put('/edit/:id', enderecoController.update);
router.delete('/delete/:id', enderecoController.delete);

module.exports = router;