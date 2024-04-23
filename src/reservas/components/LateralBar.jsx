import React, { useState } from 'react';
import { Box, Collapse, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const LateralBar = ({ anchoCaja = 240 }) => {
  const navigate = useNavigate();
  const [openAmbientesSubMenu, setOpenAmbientesSubMenu] = useState(false);

  const handleSubMenuClick = () => {
    navigate('/dashboard/ambientes');
    setOpenAmbientesSubMenu(!openAmbientesSubMenu);
  };

  return (
    <Box 
        id='lateral-bar-box'
        component='nav'
        sx={{width:{sm:anchoCaja}, flexShrink:{sm:0}}}
    >
      <Drawer
        variant='permanent'
        open={true}
        sx={{
          display: {xs: 'block'},
           '& .MuiDrawer-paper': {boxSizing: 'border-box', width: anchoCaja, marginTop:13}
        }}
      >
        <List>
          <ListItemButton id='crear-button' onClick={handleSubMenuClick}>
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
          <ListItemButton id='lista-solicitudes' onClick={(_e) => navigate('/dashboard/solicitudes')}>
            <ListItemText primary='Solicitudes' />
          </ListItemButton>
          <ListItemButton id='ver-button' onClick={() => navigate('/dashboard/visualizar-horario')}>
            <ListItemText primary="Habilitar Fecha" />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}

export default LateralBar;
