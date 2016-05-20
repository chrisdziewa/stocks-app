import { combineReducers } from 'redux';
import message from './message-reducer';
import stocks from './stock-reducer';

const rootReducer = combineReducers({
  stocks,
  message
});

export default rootReducer;
