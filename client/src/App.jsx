import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <Router>
        <Navbar/>
        <MainRouter />
    </Router>
  );
};

export default App;