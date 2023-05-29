const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productController = require('../src/controllers/productController');
const productService = require('../src/services/productService');
const { products, createdProduct } = require('./unit/models/mocks/products.model.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando controller de produtos', function () {
  describe('Listando produtos', function () {
    beforeEach(function () {
      sinon
        .stub(productService, 'getAll')
        .resolves({ products });
    });

    it('é chamado o status com o código 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getAll(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
    });

    it('é chamado o json com a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getAll(req, res);

      expect(res.json).to.have.been.calledWith({ products });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
  describe('Cadastra uma nova pessoa motorista com carros', function () {
    beforeEach(function () {
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: null, message: createdProduct });
    });

    it('é chamado o status com o código 201', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Capa de invisibilidade',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
    });
  });
});