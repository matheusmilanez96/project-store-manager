const productModel = require('../models/productModel');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const ids = await productModel.getProductId();
  let err = false;
  if (ids.every((productId) => productId !== Number(id))) {
    err = true;
  }

  console.log(err);
  if (err) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};