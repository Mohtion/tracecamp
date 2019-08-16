import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserProvider } from 'contexts/UserContext/UserContext';
import App from 'components/App/App';

const root = (
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);

ReactDOM.render(root, document.getElementById('root'));
