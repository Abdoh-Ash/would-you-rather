import {connect} from 'react-redux';
import {values} from 'lodash';
import {useParams} from 'react-router-dom';
import NAVBAR from './NavBar';
import DASHBOARD from './Dashboard';
import VIEW_QUESTION from './ViewQuestion';
import NEW_QUESTION from './NewQuestion';
import LEADERBOARD from './Leaderboard';
import AUTHENTICATION from './Authentication';

const NavBar = connect((state) => ({loggedIn: state.authedUserID !== null, authedUser: state.users[state.authedUserID]}))(NAVBAR);

const Dashboard = connect(function (state) {
  const questionsArray = values(state.questions);
  return {
    loggedIn: state.authedUserID !== null,
    users: state.users,
    unansweredQuestions: questionsArray.filter(
      (question) => !question.optionOne.votes.includes(state.authedUserID) & !question.optionTwo.votes.includes(state.authedUserID)
    ),
    answeredQuestions: questionsArray.filter(
      (question) => question.optionOne.votes.includes(state.authedUserID) | question.optionTwo.votes.includes(state.authedUserID)
    )
  };
})(DASHBOARD);

const ViewQuestion = connect(function (state) {
  return {
    loggedIn: state.authedUserID !== null,
    authedUserID: state.authedUserID,
    users: state.users,
    questions: state.questions
  };
})((props) => <VIEW_QUESTION qid={useParams().id} {...props} />);

const NewQuestion = connect((state) => ({loggedIn: state.authedUserID !== null, authorID: state.authedUserID}))(NEW_QUESTION);

const Leaderboard = connect(function (state) {
  const counterFunction = (userID, condition) => {
    let count = 0;
    values(state.questions).forEach((question) => {
      // eslint-disable-next-line
      if (eval(condition)) {
        count++;
      }
    });
    return count;
  };

  return {
    loggedIn: state.authedUserID !== null,
    usersMetrics: values(state.users).map((user) => {
      const creationsNum = counterFunction(user.id, 'question.author === userID');
      const answersNum = counterFunction(user.id, 'question.optionOne.votes.includes(userID) | question.optionTwo.votes.includes(userID)');
      return {id: user.id, name: user.name, avatarURL: user.avatarURL, creationsNum, answersNum, score: creationsNum + answersNum};
    })
  };
})(LEADERBOARD);

const Authentication = connect((state) => ({users: values(state.users), authedUserId: state.authedUserID}))(AUTHENTICATION);

export {NavBar, Dashboard, ViewQuestion, NewQuestion, Leaderboard, Authentication};
