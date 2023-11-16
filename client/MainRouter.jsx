import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Signin from './auth/Signin'


const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </div>
  );
};

export default MainRouter;