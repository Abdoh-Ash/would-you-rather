import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {handleAddQuestion} from '../actions/ques';

class NewQuestion extends React.Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  };

  handlePost() {
    this.props.dispatch(
      handleAddQuestion({
        author: this.props.authorID,
        optionOneText: this.state.optionOneText,
        optionTwoText: this.state.optionTwoText
      })
    );
    this.props.history.push('/');
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{pathname: '/authentication', state: {from: this.props.location.pathname}}} />;
    }

    return (
      <article className="card my-3">
        <header className="card-header">Would you rather?</header>
        <div className="card-body">
          <div className="container card-text">
            <form>
              <div className="mb-3">
                <label htmlFor="optionOne" className="form-label">
                  Choice one:
                </label>
                <input type="text" className="form-control" id="optionOne" onChange={(event) => this.setState({optionOneText: event.target.value})} />
              </div>
              <div className="mb-3">
                <label htmlFor="optionTwo" className="form-label">
                  Choice Two:
                </label>
                <input type="text" className="form-control" id="optionTwo" onChange={(event) => this.setState({optionTwoText: event.target.value})} />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => this.handlePost()}>
                Post
              </button>
            </form>
          </div>
        </div>
      </article>
    );
  }
}

export default withRouter(NewQuestion);
