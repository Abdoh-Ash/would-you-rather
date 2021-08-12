import React from 'react';
import {useHistory} from 'react-router-dom';

function NotFound(props) {
  const history = useHistory();
  setTimeout(() => history.push('/'), 10000);
  return (
    <article className="alert alert-danger my-3" role="alert">
      <h4 className="alert-heading">Oops!</h4>
      <p>We can't seem to find the page you're looking for.</p>
      <hr />
      <p className="mb-0">Redirecting to Dashboard in a moment.</p>
    </article>
  );
}

export default NotFound;
