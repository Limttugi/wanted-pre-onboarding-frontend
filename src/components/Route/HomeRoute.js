import React from 'react';
import { Navigate } from 'react-router-dom';
import isLoggedin from '../../utils/isLoggedin';

const HomeRoute = ({ children }) => {
  // 로그인이 되어있으면 Todo 페이지로 리다이렉트, 아니면 홈으로 리다이렉트
  return isLoggedin() ? <Navigate to='/todo' /> : children;
};

export default HomeRoute;
