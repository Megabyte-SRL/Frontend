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

<<<<<<< HEAD
    const handleEliminarSubMenuClick = () => {
        setOpenEliminarSubMenu(!openEliminarSubMenu);
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
                        <ListItemText primary="Ambiente" />
                        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                id='crear-ambientes-button'
                                onClick={(_event) => navigate('/nuevo-ambiente')}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary="Nuevo" />
                            </ListItemButton>
                            <ListItemButton
                                id='crear-horarios-button'
                                onClick={(_event) => navigate('/crear-horario')}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary="Horarios" />
                            </ListItemButton>
                            <ListItemButton
                                id='carga-masiva-button'
                                onClick={(_event) => navigate('/carga-masiva')}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary="Masiva" />
                            </ListItemButton>
                            <ListItemButton
                                id='eliminar-ambientes-button'
                                onClick={(_event) => navigate('/eliminar-ambiente')}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary="Eliminar" />
                            </ListItemButton>
                            <ListItemButton
                                id='reservaD-button'
                                onClick={(_event) => navigate('/reservaD')}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary="ReservaD" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                {/* <List>
                    <ListItemButton
                        id='eliminar-button'
                        onClick={handleEliminarSubMenuClick}
                    >
                        <ListItemText primary="Eliminar" />
                        {openEliminarSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openEliminarSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                id='eliminar-ambientes-button'
                                onClick={(_event) => navigate('/eliminar-ambiente')}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary="Ambientes" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List> */}
            </Drawer>
        </Box>
    );
=======
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
          <ListItemButton id='reserva-solicitudes' onClick={() => navigate('/dashboard/solicitudes')}>
            <ListItemText primary='Reserva' />
          </ListItemButton>
          <ListItemButton id='ver-button' onClick={() => navigate('/dashboard/visualizar-horario')}>
            <ListItemText primary="Habilitar Fecha" />
          </ListItemButton>
          {/*<ListItemButton
            id='reservaD-button'
            onClick={() => navigate('/dashboard/reservaD')}
          >
            <ListItemText primary="ReservaD" />
          </ListItemButton>*/}
        </List>
      </Drawer>
    </Box>
  );
>>>>>>> 12484f46999fbfb3b50699e8da6fd15df1a1b311
}

export default LateralBar;
