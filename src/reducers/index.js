// IMPORTS
import {combineReducers} from 'redux';
import initReducer from './init';
import authReducer from './auth';
import userReducer from './user';
import questionReducer from './question';

// REDUCER
const rootReducer = combineReducers({
  loading: initReducer,
  authedUser: authReducer,
  users: userReducer,
  questions: questionReducer
});

// EXPORTS
export default rootReducer;
