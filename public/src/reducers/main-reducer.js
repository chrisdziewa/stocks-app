// Retrieve constants to use in reducer switch statement
import {
  APP_LOADED
} from '../constants/index';


const INITIAL_STATE = { message: '' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case APP_LOADED:
      return Object.assign({}, state, {message: 'Redux is connected!'});
    default:
      return state;
  }
};
