import React from 'react';
import ReservaLayout from '../layout/ReservaLayout';
import TablaDatos from '../components/TablaDatos';
import { Box, Paper, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const CrearHorario = () => {
  // Supongamos que tienes un array de objetos llamado `datos`
  const datos = [
    {  fecha: '2022-03-28', nombreAmbiente: 'Aula 101', capacidad: 30, descripcion: 'Aula de teoría' },
    {  fecha: '2022-03-29', nombreAmbiente: 'Laboratorio 201', capacidad: 20, descripcion: 'Laboratorio de computo' },
    // Agrega más objetos según sea necesario
  ];

  return (
    <ReservaLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10%', // Ajustar el marginTop en pantallas pequeñas
              background: 'black',
              minHeight: 'calc(100vh - 20px)', // Calcula la altura mínima para ajustarse a la pantalla
            }}
          >
            <Paper sx={{
              marginTop: '-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', // Ajusta el sombreado para el marco
              padding: '2%',
              width: '100%',
              backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
            }}>
              <Typography variant="h4" align="center" gutterBottom>
                REGISTRO DE HORARIOS
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ marginLeft: '5%' }}>
                Buscar ambientes:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}>
                <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Nombre:</Typography>
                <TextField variant="outlined" InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }} />
                <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Capacidad:</Typography>
                <TextField variant="outlined" InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }} />
              </Box>
              <TablaDatos datos={datos} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ReservaLayout>
  );
};

export default CrearHorario;
