// Retrieve constants to use in reducer switch statement
import {
  ERROR_MESSAGE,
  REMOVE_ERROR
} from '../constants/index';


const INITIAL_STATE = { text: '' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ERROR_MESSAGE:
      return Object.assign({}, state, {text: action.payload});
    case REMOVE_ERROR:
      return Object.assign({}, state, {text: ''});
    default:
      return state;
  }
};
