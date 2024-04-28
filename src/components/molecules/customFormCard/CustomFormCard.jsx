import React from 'react';

import { Grid, Typography } from '@mui/material';

const CustomFormCard = ({ children, titulo = '', styles = {} }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={styles}
    >
      <Grid item
        className='box-shadow'
        xs={3}
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >
        <Typography variant='h5' sx={{ mb: 1 }}>{titulo}</Typography>
        {children}
      </Grid>
    </Grid>
  )
}

export default CustomFormCard;
