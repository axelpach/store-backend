const express = require('express');
const UsersServices = require('./services/users.services');

const router = express.Router();
const service = new UsersServices;

router.get('/', (req, res) => {
  const {limit, offset} = req.query;
  const answer = service.find(limit, offset);
  res.status(200).json(answer);

});

module.exports = router;
