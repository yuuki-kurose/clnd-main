import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginUserForm from './Login';
import SearchToUserData from './Search';

const CommonRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginUserForm />} />
        <Route path="/search" element={<SearchToUserData />} />
      </Routes>
    </Router>
  )
};

export default CommonRouter;