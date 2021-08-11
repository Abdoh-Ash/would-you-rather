// IMPORTS
import {combineReducers} from 'redux';
import initReducer from './init';
import authReducer from './auth';
import userReducer from './user';
import questionReducer from './ques';

// REDUCER
const rootReducer = combineReducers({
  initialized: initReducer,
  authedUserID: authReducer,
  users: userReducer,
  questions: questionReducer
});

// EXPORTS
export default rootReducer;
