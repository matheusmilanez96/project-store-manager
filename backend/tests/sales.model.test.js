const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../src/models/salesModel');

const connection = require('../src/models/connection');
const { sales } = require('./unit/models/mocks/sales.model.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Recuperando a lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales[0]]);
    // Act
    const result = await salesModel.getById(1);
    // Assert
    expect(result).to.be.deep.equal(sales[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});