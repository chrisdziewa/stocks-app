const Mongoose = require('mongoose');

const Stock = new Mongoose.Schema({
  symbol: String
});

module.exports = Stock;
