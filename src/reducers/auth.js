// IMPORTS
import {SIGN_IN} from '../actions/auth';

// REDUCER
function userReducer(state = null, action) {
  switch (action.type) {
    case SIGN_IN:
      return action.userID;
    default:
      return state;
  }
}

// EXPORTS
export default userReducer;
