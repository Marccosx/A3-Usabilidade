const express = require('express');
const router = express.Router();
const RestauranteController = require('../controllers/restauranteController');

router.get('/', RestauranteController.list);
router.get('/search/', RestauranteController.filtro);
router.post('/create', RestauranteController.create);
router.put('/edit/:id', RestauranteController.edit);
router.delete('/delete/:id', RestauranteController.delete);

module.exports = router;