import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

const NavBar = ({anchoCaja}) => {
  return (
    <AppBar position='fixed' 
            sx={{
                //width: {sm: `calc(100% - ${anchoCaja}px)`},
                width: {sm: `100%`}
                //ml: {sm: `${ anchoCaja }px` }

            }}>


        <Toolbar>
            <Grid container direction='column' justifyContent='center' alignItems='center' >
                <Typography variant='h6' noWrap component='div' marginTop={'20px'}>SISTEMA DE RESERVA DE</Typography>
                <Typography variant='h6' noWrap component='div' marginBottom={'20px'}>AULAS FCYT</Typography>

            </Grid>
        </Toolbar>

    </AppBar>
  )
}

export default NavBar
