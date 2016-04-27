import {
  ADD_STOCK
} from '../constants/index';


const INITIAL_STATE = { data: [], symbolList: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
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
