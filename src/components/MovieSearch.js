
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Card, CardMedia, CardContent, Typography, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import AuthContext from '../context/AuthContext';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user, movieLists,setMovieLists } = useContext(AuthContext);
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [creatingList, setCreatingList] = useState(false);
  // const [selectedLists, setSelectedLists] = useState('');
  //   const [searchTerm, setSearchTerm] = useState('');
  // const [results, setResults] = useState([]);
  // const [selectedList, setSelectedList] = useState('');
  // const [newListName, setNewListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const searchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error searching movies', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddMovie = async (movie) => {
  //   try {
  //     await addMovieToList(selectedList, movie);
  //   } catch (error) {
  //     console.error('Error adding movie to list', error);
  //   }
  // };

  const addToMovieList = async (selectedMovie) => {
    // console.log(selectedList)
        if (!selectedList) {
          alert('Please select a list first.');
          return;
        }
    
        const movie = {
          imdbID: selectedMovie.imdbID,
          title: selectedMovie.Title,
          year: selectedMovie.Year,
          poster: selectedMovie.Poster,
        };
    
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/movies/add`, 
            {
              listId: selectedList,
              movie: movie,
            }, 
            {
              headers: { token: `${user.token}` },
            }
          );
          alert('Movie added successfully!');
        } catch (error) {
          console.log(error)
          alert('Failed to add movie. (Or) Maybe the movie is already present');
        }
  };
    
    const createNewList = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/movies/`, 
          { name: newListName, isPublic }, 
          {
            headers: { token: `${user.token}` },
          }
        );
        setMovieLists((prevLists) => [...prevLists, res.data]);
        setNewListName('');
        setIsPublic(false);
        setSelectedList(res.data._id);
        alert('List created successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to create list.');
      }
    };

    // const handleSelectChange = (movieId, listId) => {
    //   setSelectedLists(prevState => ({
    //     ...prevState,
    //     [movieId]: listId
    //   }));
    // };

  // const handleCreateList = async () => {
  //   setCreatingList(true);
  //   try {
  //     await createList(newListName);
  //     setNewListName('');
  //   } catch (error) {
  //     console.error('Error creating list', error);
  //   } finally {
  //     setCreatingList(false);
  //   }
  // };

  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={3}>
        <Typography variant="h4" gutterBottom>Search Movies</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Search for a movie"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" onClick={searchMovies} fullWidth>Search</Button>
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <Card>
                <CardMedia
                  component="img"
                  alt={movie.Title}
                  height="300"
                  image={movie.Poster}
                />
                <CardContent>
                  <Typography variant="h6">{movie.Title}</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="select-list-label">Add to List</InputLabel>
                    <Select
                      labelId="select-list-label"
                      // value={selectedList}
                      // onChange={(e) => handleSelectChange( e.target.value)}
                      value={selectedList}
                      onChange={(e) => setSelectedList(e.target.value)}
                      variant="outlined"
                    >
                      {movieLists.map((list) => (
                        <MenuItem key={list._id} value={list._id}>{list.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => addToMovieList(movie)}
                      fullWidth
                    >
                      Add to List
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Create New List</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="New List Name"
              variant="outlined"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={createNewList}
              fullWidth
              disabled={creatingList}
            >
              {creatingList ? 'Creating...' : 'Create List'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieSearch;
