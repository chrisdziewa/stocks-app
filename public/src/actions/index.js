// TODO: Fix date format for startDate in getDates function
import * as constants from '../constants';
import * as socketConstants from '../constants/sockets';
import axios from 'axios';
import config from '../../../app/config';

const api_key = config.quandl.api_key;
const dbAPI = '/api/stocks/';

// Sample quandl request
//https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2015-04-24&end_date=2016-04-25&order=asc&api_key=API_KEY_HERE

let quandlApi = `https://www.quandl.com/api/v3/datasets/WIKI/`;


// Formats start and end dates for Quandl api
function getDates() {
  let currentDate = new Date();
  let formattedEndDate = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;

  let startDate = new Date(currentDate.setUTCFullYear(currentDate.getUTCFullYear() - 1));
  let formattedStartDate = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()}`;
  return [formattedStartDate, formattedEndDate];
}

// Return data as pairs of unix timestamp and closing price for the day
function formatStockData(data) {
  let formattedData = data.map((dayInfo) => {
    let formattedDate = new Date(dayInfo[0]).getTime();
    return [formattedDate, dayInfo[4]];
  });

  return formattedData;
}

export function getSavedStockSymbols() {
  return (dispatch) => {
    axios.get(dbAPI).then(response => {
      dispatch(getSavedStocks(response.data));
      response.data.forEach(stock => {
        dispatch(getStockData(stock.symbol));
      })
    })
    .catch(e => {
      console.log(e);
    });
  }
}

function getSavedStocks(symbolList) {
  return {
    type: constants.GET_SAVED_STOCKS,
    payload: symbolList
  }
}

export function getStockData(symbol) {
  let [ startDate, endDate ] = getDates();

  let fullApi = `${quandlApi}${symbol}.json?start_date=${startDate}&end_date=${endDate}&order=asc&api_key=${api_key}`;
  return (dispatch) => {
    axios.get(fullApi).then(response => {
      let { dataset_code, name, data } = response.data.dataset;

      let formattedData = formatStockData(data);

      let stockData = {
        symbol: dataset_code,
        fullName: name,
        data: formattedData
      }
      dispatch(getSingleStock(stockData));
    })
    .catch(err => {
      console.log(`Could not find stock with symbol: ${symbol || undefined}`);
    })
  }
}

function getSingleStock(data) {
  return {
    type: constants.GET_SINGLE_STOCK,
    payload: data
  }
}

export function addStock(symbol) {
  let [ startDate, endDate ] = getDates();

  let fullApi = `${quandlApi}${symbol}.json?start_date=${startDate}&end_date=${endDate}&order=asc&api_key=${api_key}`;
  return (dispatch) => {
    axios.get(fullApi).then(response => {
      // Date is index 0, Closing price is index 4 in data array
      let { dataset_code, name, data } = response.data.dataset;

      let formattedData = formatStockData(data);


      let stockData = {
        symbol: dataset_code,
        fullName: name,
        data: formattedData
      }
      axios.put(dbAPI, {symbol: symbol}).then(response => {
        // Symbol added to db
        dispatch(stockAdded(stockData));
        dispatch(socketAddStock(stockData));
      })
      .catch(e => {
        console.log('Could not add symbol to DB');
      });
    })
    .catch(err => {
      console.log(`Could not add stock with symbol: ${symbol || undefined}`);
    });
  }
}

function stockAdded(data) {
  return {
    type: constants.ADD_STOCK,
    payload: data
  }
}

export function deleteStock(symbol) {
  return dispatch => {
    axios.delete(`${dbAPI}${symbol}`).then(response => {
      dispatch(stockDeleted(symbol));
      dispatch(socketDeleteStock(symbol));
    })
    .catch(err => {
      console.log('could not delete stock symbol: ' + symbol);
    });
  }
}

function stockDeleted(symbol) {
  return {
    type: constants.DELETE_STOCK,
    payload: symbol
  }
}

export function resetEvent() {
  return {
    type: constants.RESET_EVENT
  }
}

// Socket actions

function socketAddStock(stock) {
  return {
    type: socketConstants.ADD_STOCK,
    payload: stock
  }
}

function socketDeleteStock(stock) {
  return {
    type: socketConstants.DELETE_STOCK,
    payload: stock
  }
}
