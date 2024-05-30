// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
// import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

// const PublicList = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [list, setList] = useState(null);
//   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchList = async () => {
// //       try {
// //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies/public/${id}`);
// //         // const res = await axios.get(`${process.env.REACT_APP_API_URL}/movielists/public/${id}`,{
// //         // headers: { 
// //         //     // Authorization: `Bearer ${token}`
// //         //   token: `${user.token}`, }});

// //         setList(res.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchList();
// //   }, [id]);

//   useEffect(() => {
//     const fetchList = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${id}`);
//         setList(response.data);
//       } catch (err) {
//         setError('Error fetching the list');
//       } 
//     };
//     fetchList();
//   }, [id]);

// //   if (!list) return <Typography>Loading...</Typography>;

//   if (error) return <Typography>{error}</Typography>;

//   if (!list) return <Typography>List not found.</Typography>;

//   if (!list.isPublic && (!user || user._id !== list.user)) {
//     return <Typography>This list is not accessible.</Typography>;
//   }

//   return (
//     <Container maxWidth="md">
//       <Box mt={5}>
//         <Typography variant="h4" gutterBottom>
//           {list.name}
//         </Typography>
//         <Grid container spacing={3}>
//           {list.movies.map((movie) => (
//             <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   alt={movie.title}
//                   height="300"
//                   image={movie.poster}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{movie.title}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {movie.year}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default PublicList;


import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent} from '@mui/material';

const PublicList = () => {
  const { id } = useParams(); // Assuming the route includes the list ID as a parameter
  const { user } = useContext(AuthContext);
  const [list, setList] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/movies/public/${id}`);
        setList(response.data);
      } catch (err) {
        console.log(err)
        // setError('Error fetching the list');
      } 
    };
    fetchList();
  }, [id]);

//   if (loading) return <CircularProgress />;

//   if (error) return <Typography>{error}</Typography>;

  if (!list) return <Typography>List not found.It is not Public</Typography>;

  if (!list.isPublic && (!user || user._id !== list.user)) {
    return <Typography>This list is not accessible.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          {list.name}
        </Typography>
        <Grid container spacing={3}>
          {list.movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
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
    </Container>
  );
};

export default PublicList;
