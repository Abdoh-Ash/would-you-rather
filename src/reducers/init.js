// IMPORTS
import {INIT_DATA} from '../actions/init';

// REDUCER
function initReducer(state = true, action) {
  switch (action.type) {
    case INIT_DATA:
      return false;
    default:
      return state;
  }
}

// EXPORTS
export default initReducer;
