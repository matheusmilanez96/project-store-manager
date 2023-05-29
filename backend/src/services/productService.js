const productModel = require('../models/productModel');

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  return result;
};

const createProduct = async (data) => {
  const result = await productModel.createProduct(data);
  return result;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
