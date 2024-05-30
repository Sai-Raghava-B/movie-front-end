import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const CreateMovieList = () => {
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const { user, setMovieLists } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/movielists`, { name, movies, isPublic }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMovieLists((prevLists) => [...prevLists, res.data]);
      setName('');
      setMovies([]);
      setIsPublic(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Create New Movie List
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="List Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <FormControlLabel
            control={<Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />}
            label="Public"
          />
          <Button variant="contained" color="primary" type="submit">
            Create List
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateMovieList;
