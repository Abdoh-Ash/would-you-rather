import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {createSignInAction} from '../actions/auth';

function NavBar(props) {
  const pathname = useLocation().pathname;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <section className="navbar-nav">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
          <Link className="nav-link" to="/new/question">
            New Question
          </Link>
          <Link className="nav-link" to="/leaderboard">
            Leaderboard
          </Link>
        </section>
        {props.loggedIn && (
          <section className="navbar-nav ms-auto">
            <div className="nav-link disabled">{props.authedUser.name}</div>
            <Link className="nav-link" to={{pathname: '/authentication', state: {from: pathname}}} onClick={() => props.dispatch(createSignInAction(null))}>
              Log-Out
            </Link>
          </section>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
