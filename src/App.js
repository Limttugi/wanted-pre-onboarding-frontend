import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Sign from './pages/Sign';
import TodoList from './pages/TodoList';

import HomeRoute from './components/Route/HomeRoute';
import PrivateRoute from './components/Route/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomeRoute>
            <Sign />
          </HomeRoute>
        }
      />
      <Route
        path='/todo'
        element={
          <PrivateRoute>
            <TodoList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
