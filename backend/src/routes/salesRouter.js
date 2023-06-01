const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validateProductId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');
const validateQuantity2 = require('../middlewares/validateQuantity2');
const validateProduct = require('../middlewares/validateProduct');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post(
  '/',
  validateProductId,
  validateQuantity,
  validateQuantity2,
  validateProduct,
  salesController.addSales,
);

module.exports = salesRouter;
