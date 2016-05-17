const Mongoose = require('mongoose');

const Stock = new Mongoose.Schema({
  symbol: {
    type: String,
    unique: true
  },
  currentDay: {
    type: String
  },
  data: {
    type: Array
  }
});

module.exports = Stock;
