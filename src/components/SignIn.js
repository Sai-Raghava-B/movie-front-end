// import React, { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     login(email, password);
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={submitHandler}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;


// import React, { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     login(email, password);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>
//           Sign In
//         </Typography>
//         <form onSubmit={submitHandler}>
//           <Box mb={2}>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Box>
//           <Box mb={2}>
//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Box>
//           <Button variant="contained" color="primary" type="submit">
//             Sign In
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default SignIn;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import AuthContext from '../context/AuthContext';
// import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   // const { setUser } = useContext(AuthContext);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//         e.preventDefault();
//         try{
//         login(email, password);
//         navigate('/');
//         } catch(err){
//           setError('')
//         }
//       };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>
//           Sign In
//         </Typography>
//         {error && <Alert severity="error">{error}</Alert>}
//         <form onSubmit={submitHandler}>
//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Box mt={2}>
//             <Button type="submit" variant="contained" color="primary">
//               Sign In
//             </Button>
//           </Box>
//         </form>
//         <Box mt={2}>
//           <Button variant="outlined" color="secondary" onClick={() => navigate('/signup')}>
//             Register
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default SignIn;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
// import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await login(email, password);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>
//           Sign In
//         </Typography>
//         {error && <Alert severity="error">{error}</Alert>}
//         <form onSubmit={submitHandler}>
//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Box mt={2}>
//             <Button type="submit" variant="contained" color="primary">
//               Sign In
//             </Button>
//           </Box>
//         </form>
//         <Box mt={2}>
//           <Button variant="outlined" color="secondary" onClick={() => navigate('/signup')}>
//             Register
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default SignIn;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        if (err.response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else {
          setError('Server error. Please try again later.');
        }
      } else {
        // Network error or other issue
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/signup')}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
