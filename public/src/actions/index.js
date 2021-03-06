import * as constants from '../constants';
import * as socketConstants from '../constants/sockets';
import axios from 'axios';
import config from '../../../app/config';

const api_key = config.quandl.api_key;
const dbAPI = '/api/stocks/';

// Sample quandl request
//https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2015-04-24&end_date=2016-04-25&order=asc&api_key=API_KEY_HERE

let quandlApi = `https://www.quandl.com/api/v3/datasets/WIKI/`;

export function getSavedStockSymbols() {
  return (dispatch) => {
    axios.get(dbAPI).then(response => {
      dispatch(getSavedStocks(response.data));
    }, err => {
      console.log('Could not get saved stocks');
    });
  }
}

function getSavedStocks(stocks) {
  return {
    type: constants.GET_SAVED_STOCKS,
    payload: stocks
  }
}

export function addStock(ticker) {

  return (dispatch) => {
    axios.put(dbAPI, { symbol: ticker }).then(response => {
      // Date is index 0, Closing price is index 4 in data array
      let { symbol, fullName, data } = response.data;

      let stockData = {
        symbol: symbol,
        fullName: fullName,
        data: data
      }

      dispatch(stockAdded(stockData));
      dispatch(socketAddStock(stockData));
      dispatch(removeErrorMessage());
    }, err => {
      dispatch(setErrorMessage(`Could not add stock with symbol: ${ticker.toUpperCase() || undefined}`));
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
      dispatch(setErrorMessage('could not delete stock symbol: ' + symbol));
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

export function setErrorMessage(message) {
  return {
    type: constants.ERROR_MESSAGE,
    payload: message
  }
}

export function removeErrorMessage() {
  return {
    type: constants.REMOVE_ERROR
  }
}

