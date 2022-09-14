const Joi = require('joi');

const productId = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductShema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductShema = Joi.object({
  // productId: productId.required(),
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  productId: productId.required()
});

module.exports = { createProductShema, updateProductShema, getProductSchema}
