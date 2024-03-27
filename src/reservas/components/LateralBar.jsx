
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
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

export default LateralBar
