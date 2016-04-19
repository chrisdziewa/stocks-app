import { combineReducers } from 'redux';
import main from './main-reducer';

const rootReducer = combineReducers({
  main: main
});

export default rootReducer;
