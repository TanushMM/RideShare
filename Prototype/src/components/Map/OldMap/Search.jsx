import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InputItem from './InputItem';

function Search() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '6rem',
        right: '1rem',
        padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        borderRadius: '1rem',
        backgroundColor: 'white',
        width: { xs: '100%', sm: '24rem' },
        border: '1px solid',
        borderColor: 'grey.300',
        boxShadow: 3,
        transform: 'scale(1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Typography variant="h4" component="p" gutterBottom sx={{ fontWeight: '500' }}>
        Where to Next?
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputItem type='source' />
        <InputItem type='destination' />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
            transform: 'scale(1)',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}

export default Search;
