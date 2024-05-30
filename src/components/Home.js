// import React from 'react';
// import { Container, Box, Typography, Button, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="md">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to Movie App
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item>
//             <Button variant="contained" color="primary" onClick={() => navigate('/my-lists')}>
//               My Lists
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" color="primary" onClick={() => navigate('/search')}>
//               Search Movies
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default Home;


import React, { useContext } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Welcome to Movie App
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => navigate('/my-lists')}>
              My Lists
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => navigate('/search')}>
              Search Movies
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={logout}>
              Sign Out
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
