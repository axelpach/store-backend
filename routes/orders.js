const express = require('express');
const OrdersServices = require('./services/orders.services');

const router = express.Router();
const service = new OrdersServices;

router.get('/:orderId', (req, res) => {
  const {orderId} = req.params;
  const order = service.findOrder(orderId);
  res.status(200).json(order);
});

router.get('/:orderId/products/:productId', (req, res) => {
  const {orderId, productId} = req.params;
  res.json({
    orderId,
    productId
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const response = service.createOrder(body);
  res.status(201).json(response);
});


module.exports = router;
