import React, { useState } from 'react';
import { Box, Collapse, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const LateralBar = ({anchoCaja=240}) => {
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
                    <ListItemButton onClick={handleSubMenuClick}>
                        <ListItemText primary="Crear" />
                        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Ambientes" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Horarios" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <List>
                    <ListItemButton onClick={handleEliminarSubMenuClick}>
                        <ListItemText primary="Eliminar" />
                        {openEliminarSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openEliminarSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Ambientes" />
                            </ListItemButton>
                            
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </Box>
    );
}

export default LateralBar;











/*import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'

const LateralBar = ({anchoCaja=240}) => {
    
  return (
    <Box 
        component='nav'
        sx={{width:{sm:anchoCaja}, flexShrink:{sm:0}}}
    >
        <Drawer
            variant='permanent'
            open='true'
            sx={{
                display: {xs: 'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: anchoCaja, marginTop:13}

            }}
        >
                
        </Drawer>
    </Box>
  )
}

export default LateralBar*/