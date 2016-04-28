'use strict';
const db = require('../db');

const stockRouter = require('express').Router();

stockRouter.put('/', (req, res, next) => {
  db.stockModel.update({
    symbol: req.body.symbol
  }, { $setOnInsert: { symbol: req.body.symbol } }, { upsert: true }, (err, symbols) => {
    if (err) {
      return res.status(500).send('There was an error retrieving stock symbols');
    } else {
      return res.send('Successfully added symbol ' + req.body.symbol + ' to the database');
    }
  });
});

stockRouter.get('/', (req, res, next) => {
  console.log('Called get all stock symbols');
  db.stockModel.find({}, (err, symbols) => {
    if (err) {
      return res.status(500).send('Could not get stock symbols');
    } else {
      return res.json(symbols);
    }
  });
});

module.exports = stockRouter;
