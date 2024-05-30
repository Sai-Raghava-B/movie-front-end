


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
