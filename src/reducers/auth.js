// IMPORTS
import {INIT_DATA} from '../actions/init';
import {SIGN_IN} from '../actions/auth';

// REDUCER
function userReducer(state = {}, action) {
  switch (action.type) {
    case INIT_DATA:
      return action.authedUser;
    case SIGN_IN:
      return action.user;
    default:
      return state;
  }
}

// EXPORTS
export default userReducer;
