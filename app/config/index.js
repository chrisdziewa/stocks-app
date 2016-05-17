'use strict';

if (process.env.NODE_ENV === 'production') {
  // Offer production stage env vars
  module.exports = {
    host: process.env.host || "",
    dbURI: `mongodb://${process.env.dbUser}:${process.env.dbPassword}@ds023902.mlab.com:23902/stocks-app`,
    quandl: {
      api_key: process.env.quandlKey
    }
  }
} else {
  module.exports = require('./development.json');
}
