import React from 'react';

import PrivateHeader from './PrivateHeader';

export default (props) => {
  return (
    <div>
      <PrivateHeader title="Seus Links"/>
      <div className="page-content">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
