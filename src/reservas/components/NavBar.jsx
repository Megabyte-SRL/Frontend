import React from 'react'

import { LogoutOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

const NavBar = ({ anchoCaja }) => {
  const auth = useAuth();

  return (
    <AppBar position='fixed' 
      sx={{
        width: {sm: `100%`}
      }}
    >
      <Toolbar>
        <Grid container direction='column' justifyContent='center' alignItems='center' >
          <Typography variant='h6' noWrap component='div' style={{ fontSize: '32.4px', marginTop: '1px', marginBottom: '0px' }}>
            SISTEMA DE RESERVA DE
          </Typography>
          <Typography variant='h6' noWrap component='div' style={{ fontSize: '32.4px', marginBottom: '0px' }}>
            AULAS FCYT
          </Typography>
        </Grid>
        <IconButton color='secondary' onClick={() => auth.logout()}>
          <LogoutOutlined />
        </IconButton>
      </Toolbar>

    </AppBar>
  )
}

export default NavBar
