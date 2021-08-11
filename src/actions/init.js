// IMPORTS
import {_getUsers, _getQuestions} from '../server/api/_DATA';

// ACTION CONSTANTS
const INIT_DATA = 'INIT_DATA';

// ACTION CREATORS
function createInitDataAction(users, questions) {
  return {
    type: INIT_DATA,
    users,
    questions
  };
}

// ASYNCHRONOUS ACTION CREATORS
function handleInitialData() {
  return function (dispatch) {
    Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
      dispatch(createInitDataAction(users, questions));
    });
  };
}

// EXPORTS
export {INIT_DATA, handleInitialData};
