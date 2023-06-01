const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productService = require('../src/services/productService');
const productModel = require('../src/models/productModel');

const { products } = require('./unit/models/mocks/products.model.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando service de produtos', function () {
  describe('Listando produtos', function () {
    beforeEach(function () {
      sinon
        .stub(productModel, 'getAll')
        .resolves(products);
    });

    it('é chamado o json com a lista de produtos', async function () {
      const result = await productService.getAll();

      expect(result).to.be.deep.equal(products);
    });

    it('Recuperando um produto a partir do seu id', async function () {
      // Arrange
      sinon.stub(productModel, 'getById').resolves(products[0]);
      // Act
      const result = await productService.getById(1);
      // Assert
      expect(result).to.be.deep.equal(products[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
