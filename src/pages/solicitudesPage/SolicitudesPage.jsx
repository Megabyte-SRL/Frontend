import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../../components/organisms/customTable/CustomTable';
import SolicitarAmbienteForm from '../../components/molecules/solicitarAmbienteForm/SolicitarAmbienteForm';
import CustomModal from '../../components/organisms/customModal/CustomModal';

const SolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha'},
    { id: 'ambiente', label: 'Ambiente'},
    { id: 'horario', label: 'Horario'},
    { id: 'capacidad', label: 'Capacidad'},
    { id: 'estado', label: 'Estado'},
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => (
        <Button
          color='primary'
          variant='contained'
          onClick={() => handleOpenSolicitationForm(row)}
        >
          Solicitar
        </Button>
      )
    }
  ]; 

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    fecha: '',
    ambiente: '',
    horario: '',
    capacidad: 0,
    estado: ''
  });

  const handleOpenSolicitationForm = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  }
  
  const rows = [
    { id: 1, fecha: '15/5/2024', ambiente: 'Auditorio', horario: '6:45-8:15', estado: 'Solicitado', capacidad: 100 }, 
    { id: 2, fecha: '15/5/2024', ambiente: 'Auditorio', horario: '8:15-9:45', estado: 'Solicitado', capacidad: 100 }, 
    { id: 3, fecha: '15/5/2024', ambiente: 'Auditorio', horario: '9:45-11:15', estado: 'Disponible', capacidad: 100 }, 
    { id: 4, fecha: '15/5/2024', ambiente: 'Auditorio', horario: '11:15-12:45', estado: 'Disponible', capacidad: 100 }, 
    { id: 5, fecha: '15/5/2024', ambiente: 'Auditorio', horario: '12:45-14:15', estado: 'Disponible', capacidad: 100 }, 
    { id: 6, fecha: '15/5/2024', ambiente: 'Auditorio', horario: '14:15-15:45', estado: 'Disponible', capacidad: 100 }, 
    { id: 7, fecha: '15/5/2024', ambiente: '692 A', horario: '6:45-8:15', estado: 'Reservado', capacidad: 100 }, 
    { id: 8, fecha: '15/5/2024', ambiente: '692 A', horario: '8:15-9:45', estado: 'Reservado', capacidad: 100 }, 
    { id: 9, fecha: '15/5/2024', ambiente: '692 A', horario: '9:45-11:15', estado: 'Disponible', capacidad: 100 }, 
    { id: 10, fecha: '15/5/2024', ambiente: '692 A', horario: '11:15-12:45', estado: 'Disponible', capacidad: 100 }, 
    { id: 11, fecha: '15/5/2024', ambiente: '692 A', horario: '12:45-14:15', estado: 'Solicitado', capacidad: 100 }, 
    { id: 12, fecha: '15/5/2024', ambiente: '692 A', horario: '14:15-15:45', estado: 'Solicitado', capacidad: 100 }, 
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
              Crear solicitudes ambientes
            </Typography>
            <Typography variant='body1' gutterBottom sx={{ marginLeft: '5%' }}>
              Buscar horarios ambientes:
            </Typography>

            <CustomTable
              columns={columns}
              rows={rows}
              onClickRow={(row) => console.log(row)}
            />
            <CustomModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              title='Solicitar Ambiente'
            >
              <SolicitarAmbienteForm
                row={selectedRow}
                onClose={() => setOpenModal(false)}
              />
            </CustomModal>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SolicitudesPage;
