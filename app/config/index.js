'use strict';

if (process.env.NODE_ENV === 'production') {
  // Offer production stage env vars
  module.exports = {
    host: process.env.host || "",
    dbURI: `mongodb://${process.env.dbUser}:${process.env.dbPassword}@ds023902.mlab.com:23902/stocks-app`
  }
} else {
  module.exports = require('./development.json');
}
