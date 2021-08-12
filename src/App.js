import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar, Dashboard, ViewQuestion, NewQuestion, Leaderboard, Authentication, NotFound} from './components/index';
import {handleInitialData} from './actions/init';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="container">
        <header>
          <NavBar />
        </header>
        {this.props.hasLoaded ? (
          <main>
            <Switch>
              <Route path="/" exact={true} component={Dashboard} />
              <Route path="/questions/:id" exact={true} component={ViewQuestion} />
              <Route path="/add" exact={true} component={NewQuestion} />
              <Route path="/leaderboard" exact={true} component={Leaderboard} />
              <Route path="/authentication" exact={true} component={Authentication} />
              <Route component={NotFound} />
            </Switch>
          </main>
        ) : (
          <div className="text-center m-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect((state) => ({hasLoaded: state.initialized}))(App);
