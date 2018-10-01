import React from 'react';
import {Link} from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>404</h1>
        <p>Está página não existe</p>
        <Link to="/" className="button button--link">Voltar para íncio!</Link>
      </div>
    </div>
  );
}
