// IMPORTS
import {cloneDeep} from 'lodash';
import {INIT_DATA} from '../actions/init';
import {ADD_QUESTION, ANSWER_QUESTION, UNANSWER_QUESTION} from '../actions/ques';

// REDUCER
function questionReducer(state = {}, action) {
  const newState = cloneDeep(state);

  switch (action.type) {
    case INIT_DATA:
      return action.questions;

    case ADD_QUESTION:
      newState[Object.keys(action)[1]] = action[Object.keys(action)[1]];
      return newState;

    case ANSWER_QUESTION:
      newState[action.payload.qid][action.payload.answer].votes.push(action.payload.authedUser);
      return newState;

    case UNANSWER_QUESTION:
      newState[action.payload.qid][action.payload.answer].votes = newState[action.payload.qid][action.payload.answer].votes.filter(
        (user) => user !== action.payload.authedUser
      );
      return newState;

    default:
      return state;
  }
}

// EXPORTS
export default questionReducer;
