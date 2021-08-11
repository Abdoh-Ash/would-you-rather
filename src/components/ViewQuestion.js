import React, {Component} from 'react';
import {capitalize, lowerCase} from 'lodash';
import {handleAnswerQuestion} from '../actions/ques';
import {Redirect} from 'react-router-dom';

class ViewQuestion extends Component {
  state = {
    notFound: false,
    didAnswer: false,
    answer: null
  };

  componentDidMount() {
    if (!(this.props.qid in this.props.questions)) {
      this.setState({notFound: true});
    }

    if (this.props.questions[this.props.qid].optionOne.votes.includes(this.props.authedUserID)) {
      this.setState({didAnswer: true, answer: 'optionOne'});
    } else if (this.props.questions[this.props.qid].optionTwo.votes.includes(this.props.authedUserID)) {
      this.setState({didAnswer: true, answer: 'optionTwo'});
    }
  }

  handleAnswer(authedUser, qid, answer) {
    if (!this.state.didAnswer) {
      this.props.dispatch(handleAnswerQuestion({authedUser, qid, answer}));
      this.setState({didAnswer: true, answer});
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{pathname: '/authentication', state: {from: this.props.location.pathname}}} />;
    } else if (this.state.notFound) {
      return <Redirect to="/not-found" />;
    }

    const authedUser = this.props.authedUserID;
    const qid = this.props.qid;
    const question = this.props.questions[qid];
    const user = this.props.users[question.author];

    return (
      <article className="card my-3">
        <header className="card-header">
          <img src={user.avatarURL} className="img-fluid img-thumbnail me-2" width="30rem" height="30rem" alt="Avatar URL" />
          {`${user.name} asked:`}
        </header>
        <div className="card-body">
          <h5 className="card-title">Would you rather?</h5>
          <div className="container card-text">
            <div className="btn-group-vertical" role="group" aria-label="Basic radio toggle button group">
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                checked={this.state.answer === 'optionOne'}
                onChange={() => this.handleAnswer(authedUser, qid, 'optionOne')}
              />
              <label className="btn btn-outline-primary" htmlFor="btnradio1">
                {capitalize(lowerCase(question.optionOne.text)) +
                  (this.state.didAnswer
                    ? ` [${question.optionOne.votes.length} out of ${Object.keys(this.props.users).length} (${Math.round(
                        (question.optionOne.votes.length / Object.keys(this.props.users).length) * 100
                      )}%) chose this]`
                    : '')}
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                checked={this.state.answer === 'optionTwo'}
                onChange={() => this.handleAnswer(authedUser, qid, 'optionTwo')}
              />
              <label className="btn btn-outline-primary" htmlFor="btnradio2">
                {capitalize(lowerCase(question.optionTwo.text)) +
                  (this.state.didAnswer
                    ? ` [${question.optionTwo.votes.length} out of ${Object.keys(this.props.users).length} (${Math.round(
                        (question.optionTwo.votes.length / Object.keys(this.props.users).length) * 100
                      )}%) chose this]`
                    : '')}
              </label>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default ViewQuestion;
