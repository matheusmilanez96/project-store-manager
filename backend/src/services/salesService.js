const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

const addSales = async (data) => {
  const saleId = await salesModel.addSale();
  const newData = [];
  data.forEach((sale) => {
    const { productId, quantity } = sale;
    const element = {
      saleId,
      productId,
      quantity,
    };
    newData.push(element);
  });
  const salesPromise = newData.map((sale) => salesModel.addSaleProduct(sale));
  const salesResult = await Promise.all(salesPromise);
  const retorno = {
    id: saleId,
    itemsSold: salesResult,
  };
  return retorno;
};

module.exports = {
  getAll,
  getById,
  addSales,
};
