'use strict';
const db = require('../db');
const axios = require('axios');
const api_key = require('../config').quandl.api_key;
const quandlApi = `https://www.quandl.com/api/v3/datasets/WIKI/`;

// Formats start and end dates for Quandl api
function getDates() {
  let currentDate = new Date();

  let startDate = new Date(currentDate.setUTCFullYear(currentDate.getUTCFullYear() - 1));
  let formattedStartDate = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()}`;
  return formattedStartDate;
}

// Return data as pairs of unix timestamp and closing price for the day
function formatStockData(data) {
  let formattedData = data.map((dayInfo) => {
    let formattedDate = new Date(dayInfo[0]).getTime();
    return [formattedDate, dayInfo[4]];
  });

  return formattedData;
}

function getSingleStockData(symbol) {
  let startDate = getDates();

  let fullApi = `${quandlApi}${symbol}.json?start_date=${startDate}&order=asc&api_key=${api_key}`;
  return new Promise((resolve, reject) => {
    axios.get(fullApi).then(response => {
      // let { dataset_code, name, data } = response.data.dataset;
      let result = response.data.dataset;

      let formattedData = formatStockData(result.data);

      let stockData = {
        symbol: result.dataset_code,
        fullName: result.name,
        data: formattedData
      }

      resolve(stockData);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function updateStock(symbol) {
  return new Promise((resolve, reject) => {
    getSingleStockData(symbol).then(response => {
      db.stockModel.findAndModify({
        symbol: symbol
      }, {
        symbol: symbol,
        fullName: response.name,
        data: response.data
      }, { new: true }, (err, stock) => {
        if (err) {
          reject(err);
        } else {
          resolve(stock);
        }
      });
    });
  });
}

module.exports = {
  getDates,
  formatStockData,
  getSingleStockData,
  updateStock
}
