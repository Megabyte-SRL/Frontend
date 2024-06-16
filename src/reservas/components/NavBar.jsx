import React, { useState } from 'react'

import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Box
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const NavBar = ({ anchoCaja }) => {
  const settings = ['Perfil', 'Salir'];
  const auth = useAuth();
  const navigate = useNavigate();

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: 'white', 
        color: '#1976D2', 
        fontWeight: 'bold',
        cursor: 'pointer',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      //onClick: handleAvatarClick,
    };
  }
  
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (link) => {
    setAnchorElUser(null);
    if (link === 'Perfil') {
      navigate('/dashboard/profile');
    }
  };

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
        
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(sessionStorage.getItem('nombre'))} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  if (setting === 'Perfil') {
                    navigate('/dashboard/profile');
                  } else if (setting === 'Salir') {
                    auth.logout();
                  }
                  setAnchorElUser(null);
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </Toolbar>

    </AppBar>
  );
}

export default NavBar;
