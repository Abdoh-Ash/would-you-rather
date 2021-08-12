import React from 'react';
import {createSignInAction} from '../actions/auth';
import {useHistory} from 'react-router-dom';

function Authentication(props) {
  const history = useHistory();
  return (
    <div className="container">
      <article className="row justify-content-center">
        <section className="col-12 text-center">
          <h3 className="mt-5">Welcome to the Would-You-Rather game!</h3>
          <p className="text-muted">Please sign-in to continue.</p>
        </section>
        <section className="col-4">
          <label className="form-label" htmlFor="users">
            Sign-in as:
          </label>
          <select
            id="users"
            className="form-select"
            value={props.authedUserId || 'none'}
            onChange={(event) => {
              props.dispatch(createSignInAction(event.target.value));
              props.location.state ? history.push(props.location.state.from) : history.push('/');
            }}>
            <option value="none" disabled={true}>
              None
            </option>
            {props.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </section>
      </article>
    </div>
  );
}

export default Authentication;
