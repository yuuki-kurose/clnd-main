import './bootstrap';

import React from 'react';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import LoginUserForm from './Pages/Login';
import RegistrationForm from './Pages/Register';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginUserForm />} />
        <Route path="/Register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

createInertiaApp({
  resolve: name => {
    if (name === 'Home') {
      return import(`./Pages/${name}.tsx`);
    }
    return import(`./Pages/${name}.tsx`).then(module => ({ default: module[name] }));
  },
  setup({ el, App: InertiaApp, props }) {
    createRoot(el).render(
      <App>
        <InertiaApp {...props} />
      </App>
    );
  },
});
