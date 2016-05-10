'use strict';
const db = require('../db');

const stockRouter = require('express').Router();

stockRouter.put('/', (req, res, next) => {
  let symbol = req.body.symbol.toUpperCase();
  db.stockModel.update({
    symbol: symbol
  }, { $setOnInsert: { symbol: symbol } }, { upsert: true }, (err, symbols) => {
    if (err) {
      return res.status(500).send('There was an error retrieving stock symbols');
    } else {
      return res.send('Successfully added symbol ' + req.body.symbol + ' to the database');
    }
  });
});

stockRouter.get('/', (req, res, next) => {
  db.stockModel.find({}, (err, symbols) => {
    if (err) {
      return res.status(500).send('Could not get stock symbols');
    } else {
      return res.json(symbols);
    }
  });
});

stockRouter.delete('/:symbol', (req, res, next) => {
  let symbol = req.params.symbol;
  db.stockModel.remove({
    symbol: symbol
  }, (err, response) => {
    if (err) {
      return res.send(err);
    } else {
      if (response.result.n > 0) {
        return res.send('Symbol ' + symbol + ' has been deleted');
      } else {
        return res.status(404).send('Symbol doesn\'t exist');
      }
    }
  });
});

module.exports = stockRouter;
