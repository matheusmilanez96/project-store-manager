const productService = require('../services/productService');

const getAll = async (req, res) => {
  const result = await productService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const data = req.body;
  const result = await productService.createProduct(data);
  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productService.updateProduct(id, name);
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};
