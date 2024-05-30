// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import MovieSearch from './components/MovieSearch';
// import MovieList from './components/MovieList';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Switch>
//           <Route path="/signin" component={SignIn} />
//           <Route path="/signup" component={SignUp} />
//           <Route path="/search" component={MovieSearch} />
//           <Route path="/lists" component={MovieList} />
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import MovieSearch from './components/MovieSearch';
// import MovieList from './components/MovieList';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/search" element={<MovieSearch />} />
//           <Route path="/lists" element={<MovieList />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import MovieSearch from './components/MovieSearch';
// import MovieList from './components/MovieList';
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/" element={<Navigate to="/search" />} />
//           <Route path="/search" element={<ProtectedRoute element={<MovieSearch />} />} />
//           <Route path="/lists" element={<ProtectedRoute element={<MovieList />} />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import MovieSearch from './components/MovieSearch';
// import MovieList from './components/MovieList';
// import PublicList from './components/PublicList';

// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/" element={<ProtectedRoute element={<MovieList />} />} />
//           <Route path="/search" element={<ProtectedRoute element={<MovieSearch />} />} />
//           {/* <Route path="/create-list" element={<ProtectedRoute element={<CreateMovieList />} />} /> */}
//           <Route path="/public/:id" element={<PublicList />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


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
