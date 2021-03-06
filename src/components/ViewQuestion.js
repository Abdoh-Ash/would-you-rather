import React, {Component} from 'react';
import {capitalize, lowerCase} from 'lodash';
import {handleAnswerQuestion} from '../actions/ques';
import {Redirect} from 'react-router-dom';

class ViewQuestion extends Component {
  state = {
    didAnswer: false,
    answer: null
  };

  componentDidMount() {
    if (!(this.props.qid in this.props.questions)) {
      return;
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
    if (!(this.props.qid in this.props.questions)) {
      return <Redirect to="/not-found" />;
    } else if (!this.props.loggedIn) {
      return <Redirect to={{pathname: '/authentication', state: {from: this.props.location.pathname}}} />;
    }

    const authedUser = this.props.authedUserID;
    const qid = this.props.qid;
    const question = this.props.questions[qid];
    const user = this.props.users[question.author];

    const optionOneVotesCount = question.optionOne.votes.length;
    const optionTwoVotesCount = question.optionTwo.votes.length;
    const totalVotesCount = optionOneVotesCount + optionTwoVotesCount;

    return (
      <article className="card my-3">
        <header className="card-header">
          <img src={user.avatarURL} className="img-fluid img-thumbnail me-2" width="30rem" height="30rem" alt="Avatar URL" />
          {`${user.name} asked:`}
        </header>
        <section className="card-body">
          <h5 className="card-title">Would you rather?</h5>
          <div className="container card-text">
            <div className="btn-group-vertical" role="group">
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
                    ? ` [${optionOneVotesCount} out of ${totalVotesCount} (${Math.round((optionOneVotesCount / totalVotesCount) * 100)}%) chose this]`
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
                    ? ` [${optionTwoVotesCount} out of ${totalVotesCount} (${Math.round((optionTwoVotesCount / totalVotesCount) * 100)}%) chose this]`
                    : '')}
              </label>
            </div>
          </div>
        </section>
      </article>
    );
  }
}

export default ViewQuestion;
