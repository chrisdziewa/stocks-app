import {
  ADD_STOCK,
  GET_SAVED_STOCKS,
  GET_SINGLE_STOCK
} from '../constants/index';


const INITIAL_STATE = { data: [], symbolList: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_SAVED_STOCKS:
      let savedSymbols = action.payload.map(stock => {
        return stock.symbol;
      });
      return Object.assign({}, state, {symbolList: savedSymbols});
    case GET_SINGLE_STOCK:
      let currentStocks = [...state.data];
      currentStocks.push(action.payload);
      return Object.assign({}, state, {data: currentStocks});
    case ADD_STOCK:
      let symbols = [...state.symbolList];
      let newData = [...state.data];
      if (symbols.indexOf(action.payload.symbol)) {
        symbols.push(action.payload.symbol);
        newData.push(action.payload);
      } else {
        return state;
      }
      return Object.assign({}, state, {data: newData}, {symbolList: symbols});
    default:
      return state;
  }
};
