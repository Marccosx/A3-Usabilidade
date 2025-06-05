const express = require('express');
const router = express.Router();
const RestauranteController = require('../controllers/restauranteController');

router.get('/', RestauranteController.list);
router.post('/create', RestauranteController.create);
router.put('/edit/:id', RestauranteController.edit);
router.delete('/delete/:id', RestauranteController.delete);
router.get('/:id', RestauranteController.listarRestauranteporID);
router.get('/usuario/:id_usuario', RestauranteController.listarRestauranteporUsuario);

module.exports = router;