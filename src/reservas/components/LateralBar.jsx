import React, { useState } from 'react';
import { Box, Collapse, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LateralBar = ({ anchoCaja = 240 }) => {
    const navigate = useNavigate();
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [openEliminarSubMenu, setOpenEliminarSubMenu] = useState(false);

    const handleSubMenuClick = () => {
        setOpenSubMenu(!openSubMenu);
    };

    const handleEliminarSubMenuClick = () => {
        setOpenEliminarSubMenu(!openEliminarSubMenu);
    };

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
                <List>
                    <ListItemButton id='ver-button' onClick={() => navigate('/visualizar-horario')}>
                        <ListItemText primary="Habilitar Fecha" />
                    </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
}

export default LateralBar;