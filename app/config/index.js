'use strict';

if (process.env.NODE_ENV === 'production') {
  // Offer production stage env vars
  module.exports = {
    host: process.env.host || "",
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
  }
} else {
  module.exports = require('./development.json');
}
