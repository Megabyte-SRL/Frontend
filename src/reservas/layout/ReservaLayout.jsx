import React from 'react'
import { Box, Toolbar, List, ListItem, ListItemText, Paper  } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../components/NavBar';
import LateralBar from '../components/LateralBar';
//import imagen from './escudo-01.png';

const ReservaLayout = ({children}) => {

  const anchoCaja=200;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Box sx={{display: 'flex',  minHeight: '100vh'}}>
      {/* BarraNavegacion */}
      <NavBar anchoCaja={anchoCaja}/>
      {/**BarraLateral */}
      <LateralBar anchoCaja={anchoCaja}/>
      {/**main */}
      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        <Toolbar/>
        {/*<Paper
          sx={{
            flexGrow: 1,
            //backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${imagen})`, // degradado transparente del fondo
            backgroundSize: '48%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100%', // Para ocupar toda la altura disponible
            ...(isSmallScreen && { backgroundSize: 'contain' }), // pant pequeña, ajustar la imagen
          }}
        >*/}
          {children}
        {/*</Paper>*/}
      </Box>
    </Box>
  )
}

export default ReservaLayout
