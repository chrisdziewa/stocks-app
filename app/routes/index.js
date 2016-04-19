/* Use this file to export all routes */
'use strict';

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.sendFile('/public/index.html');
});

module.exports = {
  main: router
}
