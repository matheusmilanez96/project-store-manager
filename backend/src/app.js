const express = require('express');
const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;
