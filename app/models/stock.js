const Mongoose = require('mongoose');

const Stock = new Mongoose.Schema({
  symbol: {
    type: String,
    unique: true
  },
  fullName: {
    type: String
  },
  currentDay: {
    type: String
  },
  data: {
    type: Array
  }
});

module.exports = Stock;
