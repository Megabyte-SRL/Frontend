import { Box, Toolbar } from '@mui/material'
import React from 'react'
import NavBar from '../components/NavBar';
import LateralBar from '../components/LateralBar';

const ReservaLayout = ({children}) => {

    const anchoCaja=240;

  return (
    <Box sx={{display: 'flex'}}>

        {/* BarraNavegacion */}
        <NavBar anchoCaja={anchoCaja}/>

        {/**BarraLateral */}
        <LateralBar anchoCaja={anchoCaja}/>
        {/**main */}

        <Box component='main' sx={{flexGrow: 1, p: 3}}>

            <Toolbar/>
            {children}
        </Box>
    </Box>
  )
}

export default ReservaLayout
