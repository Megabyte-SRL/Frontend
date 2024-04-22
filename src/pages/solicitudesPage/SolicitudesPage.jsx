import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../../components/organisms/customTable/CustomTable';

const SolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha'},
    { id: 'ambiente', label: 'Ambiente'},
    { id: 'horario', label: 'Horario'},
    { id: 'estado', label: 'Estado'},
  ]; 

  const rows = [
    { id: 1, fecha: '15/5/2024', ambiente: 'auditorio', horario: '6:45-8:15', estado: 'Disponible' }, 
    { id: 2, fecha: '15/5/2024', ambiente: 'auditorio', horario: 'Horario', estado: 'Disponible' }, 
    { id: 3, fecha: '15/5/2024', ambiente: 'auditorio', horario: 'Horario', estado: 'Disponible' }, 
    { id: 4, fecha: '15/5/2024', ambiente: 'auditorio', horario: 'Horario', estado: 'Disponible' }, 
    { id: 5, fecha: '15/5/2024', ambiente: 'auditorio', horario: 'Horario', estado: 'Disponible' }, 
    { id: 6, fecha: '15/5/2024', ambiente: 'auditorio', horario: 'Horario', estado: 'Disponible' }, 
  ];

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='solicitudes-ambientes-box'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10%',
            background: 'black',
            minHeight: 'calc(100vh - 20px)',
          }}
        >
          <Paper
            sx={{
              marginTop: '-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
              padding: '2%',
              width: '100%',
              backgroundColor: '#F3F6F9',
            }}
          >
            <Typography variant='h4' align='center' gutterBottom>
              Solicitudes ambientes
            </Typography>
            <Typography variant='body1' gutterBottom sx={{ marginLeft: '5%' }}>
              Buscar solicitudes ambientes:
            </Typography>

            <CustomTable
              columns={columns}
              rows={rows}
              onClickRow={(row) => console.log(row)}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SolicitudesPage;
