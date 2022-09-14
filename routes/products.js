const express = require('express');

const ProductsService = require('./services/products.services.js');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductShema, updateProductShema, getProductSchema} = require('../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService;

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('soy un filtro');
})

router.get('/:productId',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

    try {
      const {productId} = req.params;
      const product = await service.findOne(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }

});

router.post('/',
validatorHandler(createProductShema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newProduct
    })
});

router.patch('/:productId',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductShema, 'body'),
async (req, res, next) => {
  try {
    const { productId } = req.params;
    const body = req.body;
    const product = await service.update(productId, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  const message = service.delete(productId);

  res.json(message);
});

module.exports = router;
