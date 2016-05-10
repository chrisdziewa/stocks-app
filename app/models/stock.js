const Mongoose = require('mongoose');

const Stock = new Mongoose.Schema({
  symbol: {
    type: String,
    unique: true
  }
});

module.exports = Stock;
