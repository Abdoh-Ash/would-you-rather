// IMPORTS
import {INIT_DATA} from '../actions/init';

// REDUCER
function initReducer(state = false, action) {
  switch (action.type) {
    case INIT_DATA:
      return true;
    default:
      return state;
  }
}

// EXPORTS
export default initReducer;
