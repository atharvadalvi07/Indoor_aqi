// src/Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route exact path="/" component={App} />
    </Routes>
  </Router>
);

export default AppRouter;
