import { Box, Toolbar, List, ListItem, ListItemText, Paper, Grid, Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import ReservaLayout from '../layout/ReservaLayout'

const NuevoAmbiente = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm')); // Verificar si es una pantalla pequeña

  return (
    <ReservaLayout>
      <Grid container justifyContent="center" >
        <Grid item xs={12} md={12} lg={90} sx={{ background: '' }} >
          <Box
            sx={{
    
              display: 'flex',
              justifyContent: 'center',
              marginTop: matches ? '10%' : '10%', // Ajustar el marginTop en pantallas pequeñas
              background: 'black',
              minHeight: 'calc(100vh - 20px)', // Calcula la altura mínima para ajustarse a la pantalla
            }}
          >
              <Paper sx={{
              marginTop:'-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', // Ajusta el sombreado para el marco
              padding: '2%',
              width: '100%',
              backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
            }}>
              <Typography variant="h5" align="center" gutterBottom>
                REGISTRO DE AMBIENTES
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography variant="body1" sx={{ marginRight: '1rem' }}>Identificador de ambiente:</Typography>
                <TextField label="" variant="outlined" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography variant="body1" sx={{ marginRight: '1rem' }}>Capacidad de ambiente:</Typography>
                <TextField label="" variant="outlined" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography variant="body1" sx={{ marginRight: '1rem' }}>Accesibilidad:</Typography>
                <TextField label="" variant="outlined" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography variant="body1" sx={{ marginRight: '1rem' }}>Descripcion de ambiente:</Typography>
                <TextField label="" variant="outlined" />
              </Box>
              <Toolbar>
                <List>
                  <ListItem button>
                    <ListItemText primary="Botón 1" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Botón 2" />
                  </ListItem>
                  {/* Agrega más elementos según sea necesario */}
                </List>
              </Toolbar>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ReservaLayout>
  );
};

export default NuevoAmbiente;
