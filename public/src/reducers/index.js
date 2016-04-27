import { combineReducers } from 'redux';
import main from './main-reducer';
import stocks from './stock-reducer';

const rootReducer = combineReducers({
  stocks
});

export default rootReducer;
