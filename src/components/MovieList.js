


// import React, { useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';
// import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Switch, FormControlLabel } from '@mui/material';

// const MovieList = () => {
//   const { user, movieLists, setMovieLists } = useContext(AuthContext);

//   const toggleVisibility = async (listId) => {
//     try {
//       const res = await axios.patch(`${process.env.REACT_APP_API_URL}/movies/public/${listId}`, {}, {
//         headers: {
//           // Authorization: `Bearer ${user.token}`,
//           token: `${user.token}`
//         },
//       });
//       setMovieLists((prevLists) =>
//         prevLists.map((list) =>
//           list._id === listId ? { ...list, isPublic: res.data.isPublic } : list
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>
//           My Movie Lists
//         </Typography>
//         {movieLists.map((list) => (
//           <Box key={list._id} mb={5}>
//             <Typography variant="h5" gutterBottom>
//               {list.name}
//             </Typography>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={list.isPublic}
//                   onChange={() => toggleVisibility(list._id)}
//                   color="primary"
//                 />
//               }
//               label={list.isPublic ? 'Public' : 'Private'}
//             />
//             <Grid container spacing={3}>
//               {list.movies.map((movie) => (
//                 <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       alt={movie.title}
//                       height="300"
//                       image={movie.poster}
//                     />
//                     <CardContent>
//                       <Typography variant="h6">{movie.title}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default MovieList;


import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, IconButton, Switch } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const MovieList = () => {
  const { movieLists, toggleListPublic, deleteMovieList } = useContext(AuthContext);

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>My Movie Lists</Typography>
        {movieLists.map((list) => (
          <Box key={list._id} mb={5}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" gutterBottom>{list.name}</Typography>
              <Box display="flex" alignItems="center">
                <Typography>Public</Typography>
                <Switch
                  checked={list.isPublic}
                  onChange={() => toggleListPublic(list._id)}
                  color="primary"
                />
                <IconButton onClick={() => deleteMovieList(list._id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Grid container spacing={3}>
              {list.movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={movie.title}
                      height="300"
                      image={movie.poster}
                    />
                    <CardContent>
                      <Typography variant="h6">{movie.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MovieList;
