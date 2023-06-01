const productModel = require('../models/productModel');

module.exports = async (req, res, next) => {
    const data = req.body;
    const ids = await productModel.getProductId();
    let err = false;
    data.forEach((sale) => {
      if (ids.every((id) => id !== sale.productId)) {
        err = true;
      }
    });

    if (err) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    next();
  };