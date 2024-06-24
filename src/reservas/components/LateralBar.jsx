import React, { useState } from 'react';

import { Box, Collapse, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LateralBar = ({ anchoCaja = 240 }) => {
  const navigate = useNavigate();
  const [openAmbientesSubMenu, setOpenAmbientesSubMenu] = useState(false);

  const auth = useAuth();

  const handleAmbientesClick = () => {
    if (openAmbientesSubMenu) {
      navigate('/dashboard');
    } else {
      navigate('/dashboard/ambientes');
    }
    setOpenAmbientesSubMenu(!openAmbientesSubMenu);
  };

  const handleOtherItemClick = (path) => {
    if (openAmbientesSubMenu) {
      setOpenAmbientesSubMenu(false);
    }
    navigate(path);
  }

  return (
    <Box
      id='lateral-bar-box'
      component='nav'
      sx={{ width: { sm: anchoCaja }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: anchoCaja, marginTop: 13 }
        }}
      >
        {auth.rol !== 'docente' ?
          (
            <List>
              <ListItemButton id='crear-button' onClick={handleAmbientesClick}>
                <ListItemText primary="Ambientes" />
                {openAmbientesSubMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openAmbientesSubMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    id='crear-ambientes-button'
                    onClick={() => navigate('/dashboard/nuevo-ambiente')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Nuevo" />
                  </ListItemButton>
                  <ListItemButton
                    id='carga-masiva-button'
                    onClick={() => navigate('/dashboard/carga-masiva')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Masiva" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton id='verificar-solicitudes' onClick={() => handleOtherItemClick('/dashboard/verificar-solicitudes')}>
                <ListItemText primary='Verificar solicitudes' />
              </ListItemButton>
              <ListItemButton id='registrar-usuario-button' onClick={() => handleOtherItemClick('/dashboard/signup')}>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
              <ListItemButton id='carga-masiva-docentes-button' onClick={() => handleOtherItemClick('/dashboard/carga-masiva-docentes')}>
                <ListItemText primary="Carga masiva docentes" />
              </ListItemButton>
              <ListItemButton id='notificaciones' onClick={() => handleOtherItemClick('/dashboard/aprobar-solicitudes')}>
                <ListItemText primary="Notificaciones" />
              </ListItemButton>
              <ListItemButton id='registro-solicitudes' onClick={() => handleOtherItemClick('/dashboard/registro-solicitudes')}>
                <ListItemText primary="Registro solicitudes" />
              </ListItemButton>
            </List>
          ) : (
            <List>
              <ListItemButton id='reserva-solicitudes' onClick={() => handleOtherItemClick('/dashboard/solicitudes')}>
                <ListItemText primary='Crear solicitud ambiente' />
              </ListItemButton>
              <ListItemButton id='notificaciones-sugerencias' onClick={() => handleOtherItemClick('/dashboard/notificaciones-sugerencias')}>
                <ListItemText primary="Sugerencias" />
              </ListItemButton>
            </List>
          )
        }
      </Drawer>
    </Box>
  );
}

export default LateralBar;
