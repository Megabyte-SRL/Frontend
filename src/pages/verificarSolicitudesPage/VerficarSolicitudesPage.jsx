import React from 'react';

import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../../components/organisms/customTable/CustomTable';

const VerficarSolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha'},
    { id: 'ambiente', label: 'Ambiente'},
    { id: 'horario', label: 'Horario'},
    { id: 'capacidadAmbiente', label: 'Capacidad ambiente'},
    { id: 'capacidadReserva', label: 'Capacidad reserva' },
    { id: 'prioridad', label: 'Prioridad' },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => (
        <>
          <Button
            color='primary'
            variant='contained'
          >
            Aceptar
          </Button>
          <Button
            variant='contained'
            color='secondary'
          >
            Rechazar
          </Button>
        </>
      )
    }
  ];

  const rows = [
    {
      id: 1,
      fecha: '2023-01-01',
      ambiente: 'Auditorio',
      horario: '8:00 - 9:45',
      capacidadAmbiente: 150,
      capacidadReserva: 100,
      prioridad: 1,
    },
    {
      id: 1,
      fecha: '2023-01-01',
      ambiente: 'Auditorio',
      horario: '9:45 - 11:15',
      capacidadAmbiente: 150,
      capacidadReserva: 50,
      prioridad: 1,
    }
  ];

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='verificar-solicitudes-box'
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
              Verificar solicitudes de reserva
            </Typography>
            <Typography variant='body1' gutterBottom sx={{ marginLeft: '5%' }}>
              Buscar solicitudes:
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
};

export default VerficarSolicitudesPage;
