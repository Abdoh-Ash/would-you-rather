import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import ListQuestions from './ListQuestions';

class Dashboard extends Component {
  state = {
    answeredQuestions: false
  };

  changeTab(tab) {
    this.setState({answeredQuestions: tab === 'ANSWERED'});
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{pathname: '/authentication', state: {from: this.props.location.pathname}}} />;
    }
    return (
      <article>
        <header>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button type="button" className={`nav-link ${this.state.answeredQuestions ? '' : 'active'}`} onClick={() => this.changeTab('UNANSWERED')}>
                Unanswered Questions
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className={`nav-link ${this.state.answeredQuestions ? 'active' : ''}`} onClick={() => this.changeTab('ANSWERED')}>
                Answered Questions
              </button>
            </li>
          </ul>
        </header>
        <ListQuestions users={this.props.users} questions={this.state.answeredQuestions ? this.props.answeredQuestions : this.props.unansweredQuestions} />
      </article>
    );
  }
}

export default Dashboard;
