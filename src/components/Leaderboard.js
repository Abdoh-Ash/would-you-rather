import React from 'react';
import {Redirect} from 'react-router-dom';
import {orderBy} from 'lodash';

function Leaderboard(props) {
  if (!props.loggedIn) {
    return <Redirect to={{pathname: '/authentication', state: {from: props.location.pathname}}} />;
  }
  return (
    <div className="container-fluid p-0">
      {orderBy(props.usersMetrics, ['score'], ['desc']).map((user) => (
        <article key={user.id} className="card my-3">
          <div className="row">
            <header className="col-md-2 text-center">
              <img src={user.avatarURL} className="img-fluid img-thumbnail rounded-circle m-3" alt="Avatar URL" />
            </header>
            <section className="col-md-10">
              <div className="card-body">
                <h3 className="card-title">
                  <strong>{user.name}</strong>
                </h3>
                <p className="card-text">
                  <small className="text-muted">@{user.id}</small>
                </p>
                <p className="card-text">Questions created: {user.creationsNum}</p>
                <p className="card-text">Questions answered: {user.answersNum}</p>
                <p className="card-text">
                  <strong>Score: {user.score}</strong>
                </p>
              </div>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Leaderboard;
