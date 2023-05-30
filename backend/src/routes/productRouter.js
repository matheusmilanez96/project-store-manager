const { Router } = require('express');
const productController = require('../controllers/productController');
const validateName = require('../middlewares/validateName');

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', validateName, productController.createProduct);

module.exports = productRouter;
