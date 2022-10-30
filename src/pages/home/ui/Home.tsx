import './Home.scss';
import React from 'react';
import {Link} from 'react-router-dom';

import {Icon} from 'shared/ui/icon';

export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Icon className={'App-logo'} color={'blueLight'} icon={'logo'} style={{height: 300, width: 300}} />

        <p>
          Edit <code>src/Home.tsx</code> and save to reload.
        </p>
        <Link to={'login'}>Login</Link>
      </header>
    </div>
  );
};
