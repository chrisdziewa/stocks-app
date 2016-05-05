import * as constants from '../constants';
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
  let fullApi = `${quandlApi}${symbol}.json?start_date=2015-04-25&end_date=2016-04-26&order=asc&api_key=${api_key}`;
  return (dispatch) => {
    axios.get(fullApi).then(response => {
      let { dataset_code, name, data } = response.data.dataset;

      // Return data as pairs of unix timestamp and closing price for the day
      let formattedData = data.map((dayInfo) => {
        let formattedDate = new Date(dayInfo[0]).getTime();
        return [formattedDate, dayInfo[4]];
      });

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
  let fullApi = `${quandlApi}${symbol}.json?start_date=2015-04-25&end_date=2016-04-26&order=asc&api_key=${api_key}`;
  return (dispatch) => {
    axios.get(fullApi).then(response => {
      // Date is index 0, Closing price is index 4 in data array
      let { dataset_code, name, data } = response.data.dataset;
      let stockData = {
        symbol: dataset_code,
        fullName: name,
        data
      }
      axios.put(dbAPI, {symbol: symbol}).then(response => {
        // Symbol added to db
        dispatch(stockAdded(stockData));
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

export function getLoadedMessage() {
  return {
    type: constants.APP_LOADED
  }
}
