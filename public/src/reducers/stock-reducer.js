import {
  ADD_STOCK,
  GET_SAVED_STOCKS,
  GET_SINGLE_STOCK,
  DELETE_STOCK,
  RESET_EVENT
} from '../constants/index';


const INITIAL_STATE = { data: [], symbolList: [], event: [null, null] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_SAVED_STOCKS:
      let savedSymbols = action.payload.map(stock => {
        return stock.symbol;
      });
      return Object.assign({}, state, {symbolList: savedSymbols});
    case ADD_STOCK:
      let symbols = [...state.symbolList];
      let newData = [...state.data];
      if (symbols.indexOf(action.payload.symbol)) {
        symbols.push(action.payload.symbol);
        newData.push(action.payload);
      } else {
        return state;
      }
      return Object.assign({}, state, {data: newData}, {symbolList: symbols}, {event: [action.payload.symbol, 'add']});
    case DELETE_STOCK:
      let oldSymbols = [...state.symbolList];
      let currentData = [...state.data];
      let newSymbolList = oldSymbols.filter(symbol => {
        return symbol !== action.payload;
      });
      let changedData = currentData.filter(stock => {
        return stock.symbol !== action.payload;
      });
      return Object.assign({}, state, {symbolList: newSymbolList}, {data: changedData}, {event: [action.payload, 'delete']});
    case RESET_EVENT:
      return Object.assign({}, state, {event: INITIAL_STATE.event});
    default:
      return state;
  }
};
