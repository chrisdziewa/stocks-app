'use strict';
const config = require('../config');
const User = require('../models/user');
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
let userModel = mongoose.model('User', User);

module.exports = {
  mongoose,
  userModel
}
