import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

const NavBar = ({anchoCaja}) => {
  return (
    <AppBar position='fixed' 
            sx={{
                width: {sm: `100%`}
            }}>
        <Toolbar>
            <Grid container direction='column' justifyContent='center' alignItems='center' >
                <Typography variant='h6' noWrap component='div' style={{ fontSize: '32.4px', marginTop: '1px', marginBottom: '0px' }}>
                SISTEMA DE RESERVA DE
                </Typography>
                <Typography variant='h6' noWrap component='div' style={{ fontSize: '32.4px', marginBottom: '0px' }}>
                AULAS FCYT
                </Typography>
            </Grid>
        </Toolbar>

    </AppBar>
  )
}

export default NavBar
