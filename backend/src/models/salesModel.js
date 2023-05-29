const connection = require('./connection');

const select1 = 'SELECT sales_products.sale_id AS saleId, sales.date, sales_products.product_id';
const select2 = ' AS productId, sales_products.quantity FROM sales_products ';
const innerJoin = 'INNER JOIN sales ON sales_products.sale_id = sales.id ';

const selectId1 = 'SELECT sales.date, sales_products.product_id';
const where = 'WHERE sales_products.sale_id = ?';

const getAll = async () => {
  const [result] = await connection.execute(
    select1.concat(select2, innerJoin),
  );
  return result;
};

const getById = async (id) => {
  const string = [selectId1, select2, innerJoin, where];
  const [result] = await connection.execute(
    ''.concat(...string),
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
};