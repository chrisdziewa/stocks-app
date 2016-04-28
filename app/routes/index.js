/* Use this file to export all routes */
'use strict';
const stocks = require('./stocks.js');

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.sendFile('/public/index.html');
});

module.exports = {
  main: router,
  stocks
}
