'use strict';
const config = require('../config');
const Stock = require('../models/stock');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(config.dbURI, (err, db) => {
  if (err) {
    console.log('MongoDB Error: ', err);
  } else {
      console.log('Connected to stocks-app database');
    }
});

// Turn schemas into a usable models
let stockModel = mongoose.model('Stock', Stock);

module.exports = {
  mongoose,
  stockModel
}
