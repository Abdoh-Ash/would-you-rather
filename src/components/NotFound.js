import React from 'react';
import {Redirect, useLocation} from 'react-router-dom';

function NotFound(props) {
  const pathname = useLocation().pathname;

  if (!props.loggedIn) {
    return <Redirect to={{pathname: '/authentication', state: {from: pathname}}} />;
  }

  return (
    <article className="alert alert-danger my-3" role="alert">
      <h4 className="alert-heading">Oops!</h4>
      <p>We can't seem to find the page you're looking for.</p>
      <hr />
      <p className="mb-0">Error 404: page not found.</p>
    </article>
  );
}

export default NotFound;
