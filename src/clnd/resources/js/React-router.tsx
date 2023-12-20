import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CalenderUserPage from './Pages/Calender';

export const RouterConfig = () => {
  return (
    <Router>
      <Route path="/calender/:id" component={ CalenderUserPage } />
    </Router>
  );
};