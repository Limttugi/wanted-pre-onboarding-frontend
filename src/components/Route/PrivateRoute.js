import React from 'react';
import { Navigate } from 'react-router-dom';
import isLoggedin from '../../utils/isLoggedin';

const PrivateRoute = ({ children }) => {
  // 로그인이 되어있지 않으면 Home으로 리다이렉트
  return isLoggedin() ? children : <Navigate to='/' />;
};

export default PrivateRoute;
