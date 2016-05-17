'use strict';
const db = require('../db');
const h = require('../helpers');

const stockRouter = require('express').Router();

stockRouter.put('/', (req, res, next) => {
  let symbol = req.body.symbol.toUpperCase();

  h.getSingleStockData(symbol).then(response => {
    // Add data to database here
    db.stockModel.create({
      symbol: symbol,
      currentDay: new Date(),
      fullName: response.fullName,
      data: response.data
    }, (err, data) => {
      if (err) {
        return res.status(500).send('There was an error retrieving stock symbols');
      } else {
        return res.json(data);
      }
    });
  })
  .catch(err => {
    console.log(err);
  });
});

stockRouter.get('/', (req, res, next) => {
  db.stockModel.find({}, (err, stocks) => {
    if (err) {
      return res.status(500).send('Could not get stock symbols');
    } else {
      return res.json(stocks);
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
