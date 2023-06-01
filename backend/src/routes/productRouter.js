const { Router } = require('express');
const productController = require('../controllers/productController');
const validateName = require('../middlewares/validateName');
const validateProduct2 = require('../middlewares/validateProduct2');

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', validateName, productController.createProduct);
productRouter.put('/:id', validateName, validateProduct2, productController.updateProduct);

module.exports = productRouter;
