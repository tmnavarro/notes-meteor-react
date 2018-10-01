import {Meteor} from 'meteor/meteor';
import React from 'react';

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Sair</button>
      </div>
    </div>
  );
};

export default PrivateHeader;
