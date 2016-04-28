import * as constants from '../constants';
import axios from 'axios';
import config from '../../../app/config';

const api_key = config.quandl.api_key;
const dbAPI = '/api/stocks/';

// Sample quandl request
//https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2015-04-24&end_date=2016-04-25&order=asc&api_key=API_KEY_HERE

let quandlApi = `https://www.quandl.com/api/v3/datasets/WIKI/`;

export function getStockData(symbol) {
  let fullApi = `${quandlApi}${symbol}.json?start_date=2015-04-25&end_date=2016-04-26&order=asc&api_key=${api_key}`;
  return (dispatch) => {
    axios.get(fullApi).then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(`Could not find stock with symbol: ${symbol || undefined}`);
    })
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
        console.log('Got response from add route')
      })
      .catch(e => {
        console.log('Could not add symbol to DB');
      });
      console.log('addStock succeeded in actions with symbol: ', symbol);
      dispatch(stockAdded(stockData));
    })
    .catch(err => {
      console.log(`Could not add stock with symbol: ${symbol || undefined}`);
    })
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
