const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [result] = await connection.execute(query, [name]);
  const retorno = {
    id: result.insertId,
    name,
  };
  return retorno;
};

const getProductId = async () => {
  const query = 'SELECT id FROM products';
  const [result] = await connection.execute(query);
  const array = [];
  result.forEach((_obj, index) => {
    array.push(Object.values(result[index])[0]);
  });
  return array;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  getProductId,
};