const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const salesService = require('../src/services/salesService');
const salesModel = require('../src/models/salesModel');

const { sales } = require('./unit/models/mocks/sales.model.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando service de sales', function () {
  describe('Listando vendas', function () {
    beforeEach(function () {
      sinon
        .stub(salesModel, 'getAll')
        .resolves(sales);
    });

    it('é chamado o json com a lista de produtos', async function () {
      const result = await salesService.getAll();

      expect(result).to.be.deep.equal(sales);
    });
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(salesModel, 'getById').resolves(sales[0]);
    // Act
    const result = await salesService.getById(1);
    // Assert
    expect(result).to.be.deep.equal(sales[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
