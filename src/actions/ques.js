// IMPORTS
import {_saveQuestion, _saveQuestionAnswer} from '../server/api/_DATA';

// ACTION CONSTANTS
const ADD_QUESTION = 'ADD_QUESTION';
const ANSWER_QUESTION = 'ANSWER_QUESTION';
const UNANSWER_QUESTION = 'UNANSWER_QUESTION';

// ACTION CREATORS
function createAddQuestionAction(question) {
  const obj = {type: ADD_QUESTION};
  obj[question.id] = question;
  return obj;
}

function createToggleQuestionAction(type) {
  return function (authedUser, qid, answer) {
    return {
      type,
      payload: {
        authedUser,
        qid,
        answer
      }
    };
  };
}

// ASYNCHRONOUS ACTION CREATORS
function handleAddQuestion(payload) {
  return function (dispatch) {
    _saveQuestion(payload)
      .then((question) => {
        dispatch(createAddQuestionAction(question));
      })
      .catch(() => alert('An error occurred, please try again!'));
  };
}

function handleAnswerQuestion(payload) {
  return function (dispatch) {
    const {authedUser, qid, answer} = payload;
    dispatch(createToggleQuestionAction(ANSWER_QUESTION)(authedUser, qid, answer));
    _saveQuestionAnswer(payload).catch(() => {
      dispatch(createToggleQuestionAction(UNANSWER_QUESTION)(authedUser, qid, answer));
      alert('An error occurred, please try again!');
    });
  };
}

// EXPORTS
export {ADD_QUESTION, ANSWER_QUESTION, UNANSWER_QUESTION, handleAddQuestion, handleAnswerQuestion};
