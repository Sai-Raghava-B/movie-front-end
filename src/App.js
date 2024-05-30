

import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import MovieSearch from './components/MovieSearch';
import PublicList from './components/PublicList';
import Signin from './components/SignIn';
import Signup from './components/SignUp';
import MovieList from './components/MovieList';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && window.location.pathname !== '/signup') {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/my-lists" element={<MovieList />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/public/:id" element={<PublicList />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/signin" />} />
      )}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
