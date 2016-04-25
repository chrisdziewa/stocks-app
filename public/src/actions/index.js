import * as constants from '../constants';
import axios from 'axios';
import config from '../../../app/config';

const api_key = config.quandl.api_key;

// Sample quandl request
//https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2015-04-24&end_date=2016-04-25&order=asc&api_key=API_KEY_HERE

let quandlApi = `https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2015-04-24&end_date=2016-04-25&order=asc&api_key=${api_key}`

export function getStockData() {
  return (dispatch) => {
    axios.get(quandlApi).then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log('There was an error');
    })
  }
}

export function getLoadedMessage() {
  return {
    type: constants.APP_LOADED
  }
}
