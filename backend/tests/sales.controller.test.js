const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const salesController = require('../src/controllers/salesController');
const salesService = require('../src/services/salesService');
const productModel = require('../src/models/productModel');
const { sales, createdSale } = require('./unit/models/mocks/sales.model.mock');

const validateProductId = require('../src/middlewares/validateProductId');
const validateQuantity = require('../src/middlewares/validateQuantity');
const validateQuantity2 = require('../src/middlewares/validateQuantity2');
const validateProduct = require('../src/middlewares/validateProduct');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando controller de vendas', function () {
  describe('Listando vendas', function () {
    beforeEach(function () {
      sinon
        .stub(salesService, 'getAll')
        .resolves({ sales });
    });

    it('é chamado o status com o código 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
    });

    it('é chamado o json com a lista de vendas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAll(req, res);

      expect(res.json).to.have.been.calledWith({ sales });
    });
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('Cadastra uma nova venda', function () {
    beforeEach(function () {
      sinon
        .stub(salesService, 'addSales')
        .resolves({ message: createdSale });
    });

    it('é chamado o status com o código 201', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.addSales(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
    });

    it('é chamado o json com a venda cadastrada', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      // teste
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.addSales(req, res);

      expect(res.json).to.have.been.calledWith({ message: createdSale });
    });

    it('verifica se o middleware para productId foi chamado', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      validateProductId(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('verifica se o middleware para quantity foi chamado', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      validateQuantity(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('verifica se o middleware para quantity2 foi chamado', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      validateQuantity2(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('verifica se o middleware para product foi chamado', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      sinon
        .stub(productModel, 'getProductId')
        .returns([1, 2, 3]);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      await validateProduct(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    afterEach(function () {
    sinon.restore();
  });
  });
});