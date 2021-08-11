import React from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';

function ListQuestions(props) {
  return (
    <div className="container-fluid p-0">
      {orderBy(props.questions, ['timestamp'], ['desc']).map((question) => (
        <article key={question.id} className="card my-3">
          <header className="card-header">
            <img src={props.users[question.author].avatarURL} className="img-fluid img-thumbnail me-2" width="30rem" height="30rem" alt="Avatar URL" />
            {`${props.users[question.author].name} asked:`}
          </header>
          <section className="card-body">
            <h5 className="card-title">Would you rather?</h5>
            <p className="card-text">{`${question.optionOne.text} or ${question.optionTwo.text}`}</p>
            <Link to={`question/${question.id}`} className="btn btn-primary">
              View
            </Link>
          </section>
        </article>
      ))}
    </div>
  );
}

export default ListQuestions;
