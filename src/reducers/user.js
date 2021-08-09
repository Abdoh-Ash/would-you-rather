// IMPORTS
import {INIT_DATA} from '../actions/init';

// REDUCER
function userReducer(state = {}, action) {
  switch (action.type) {
    case INIT_DATA:
      return action.users;
    default:
      return state;
  }
}

// EXPORTS
export default userReducer;
