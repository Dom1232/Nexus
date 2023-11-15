import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './core/LoginPage';
import Home from './core/Home';

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default MainRouter;