const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productController = require('../src/controllers/productController');
const productService = require('../src/services/productService');
const { products, createdProduct } = require('./unit/models/mocks/products.model.mock');
const validateName = require('../src/middlewares/validateName');

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

  describe('Testando getById', function () {
    it('encontra o produto com id 2', async function () {
      const res = {};
      const req = {};

      sinon
        .stub(productService, 'getById')
        .resolves(products[1]);

      req.params = { id: 2 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
    });

    it('não encontra o produto com id 88', async function () {
      const res = {};
      const req = {};

      sinon
        .stub(productService, 'getById')
        .resolves(false);

      req.params = { id: 88 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getById(req, res);

      expect(res.status).to.be.calledWith(404);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
  
  describe('Cadastra um novo produto', function () {
    beforeEach(function () {
      sinon
        .stub(productService, 'createProduct')
        .resolves({ message: createdProduct });
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

    it('é chamado o json com o produto cadastrado', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Capa de invisibilidade',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.json).to.have.been.calledWith({ message: createdProduct });
    });

    it('verifica se o middleware foi chamado', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Capa de invisibilidade',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      validateName(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    afterEach(function () {
    sinon.restore();
  });
  });

  describe('Produto inválido', function () {
    it('verifica se não é chamado o next para produto sem nome', async function () {
      const res = {};
      const req = {
        body: {
          name: '',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      validateName(req, res, next);

      expect(next).not.to.have.been.calledWith();
    });

    it('verifica se não é chamado o next para produto com menos de 5 letras', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Capa',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub().returns();

      validateName(req, res, next);

      expect(next).not.to.have.been.calledWith();
    });
  });
});