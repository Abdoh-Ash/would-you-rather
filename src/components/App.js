import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/init';
import '../assets/styles/App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    if (this.props.loading) {
      return <h1>loading</h1>;
    } else {
      return <h1>Done!</h1>;
    }
  }
}

export default connect((state) => ({loading: state.loading}))(App);
