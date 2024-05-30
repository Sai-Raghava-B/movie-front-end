// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
//     // console.log(res)
//     setUser(res.data);
//     localStorage.setItem('user', JSON.stringify(res.data));
//   };

//   const register = async (username, email, password) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password });
//     setUser(res.data);
//     localStorage.setItem('user', JSON.stringify(res.data));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem('user')) || null
//   );

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
//       setUser(res.data);
//       console.log(res.data)
//       localStorage.setItem('user', JSON.stringify(res.data));
//     } catch (error) {
//       console.error(error);
//       // Handle login error (e.g., show error message)
//     }
//   };

//   const register = async (username, email, password) => {
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password });
//       setUser(res.data);
//       localStorage.setItem('user', JSON.stringify(res.data));
//     } catch (error) {
//       console.error(error);
//       // Handle registration error (e.g., show error message)
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [movieLists, setMovieLists] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchMovieLists(storedUser.token);
    }
  }, []);

  const fetchMovieLists = async (token) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies/`, {
        headers: { 
          // Authorization: `Bearer ${token}`
        token: `${token}`, },
      });
      setMovieLists(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      setUser(res.data);
      console.log(res.data)
      localStorage.setItem('user', JSON.stringify(res.data));
      fetchMovieLists(res.data.token);
    } catch (error) {
      console.error(error);
      throw(error)
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      fetchMovieLists(res.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const addMovieToList = async (listId, movie) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/movies/add`,{listId, movie}, {
        headers: { 
          // Authorization: `Bearer ${user.token}`
          token: `${user.token}`, 
       },
       
      });
      setMovieLists((prevLists) =>
        prevLists.map((list) => (list._id === listId ? { ...list, movies: [...list.movies, movie] } : list))
      );
    } catch (error) {
      console.error('Error adding movie to list', error);
    }
  };

  const createList = async (name) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/movies`, { name }, {
        headers: {
          //  Authorization: `Bearer ${user.token}` 
           token: `${user.token}`, 
      },
      });
      setMovieLists((prevLists) => [...prevLists, response.data]);
    } catch (error) {
      console.error('Error creating list', error);
    }
  };
  const toggleListPublic = async (listId) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/movies/public/${listId}`,{},{
        headers: { 
          // Authorization: `Bearer ${token}`
        token: `${user.token}`, },
      });
      setMovieLists((prevLists) =>
        prevLists.map((list) => (list._id === listId ? { ...list, isPublic: response.data.isPublic } : list))
      );
    } catch (error) {
      console.error('Error toggling list public status', error);
    }
  };
  
  const deleteMovieList = async (listId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/movies/delete/${listId}`,{
        headers: { 
          // Authorization: `Bearer ${token}`
        token: `${user.token}`, },
      });
      setMovieLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error('Error deleting list', error);
    }
  };
  

  const logout = () => {
    setUser(null);
    setMovieLists([]);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, movieLists,toggleListPublic,deleteMovieList,createList,addMovieToList ,setMovieLists }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
