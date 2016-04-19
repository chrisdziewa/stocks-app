import * as constants from '../constants';
import axios from 'axios';


export function getLoadedMessage() {
  return {
    type: constants.APP_LOADED
  }
}
