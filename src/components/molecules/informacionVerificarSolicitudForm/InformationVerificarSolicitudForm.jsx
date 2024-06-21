import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { green, red, yellow } from '@mui/material/colors';

const InformationVerificarSolicitudForm = ({
  row = {},
  onClose = () => {},
  onAccept = () => {},
  onSuggest = () => {},
  onReject = () => {},
}) => {
<<<<<<< HEAD
  const navigate = useNavigate(); // Importante: usar useNavigate para la navegación
=======
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6

  console.log('Solicitud: ', row);
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Detalles de la Solicitud
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" align="left"><strong>Fecha disponible:</strong> {row.horarioDisponible.fecha}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="left"><strong>Fecha solicitud:</strong> {row.fechaSolicitud}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right"><strong>Ambiente:</strong> {row.horarioDisponible.ambiente}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="left"><strong>Horario:</strong> {row.horarioDisponible.horario}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right"><strong>Capacidad:</strong> {row.horarioDisponible.capacidad}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="left"><strong>Prioridad:</strong> {row.prioridad}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center"><strong>Docente solicitante:</strong> {row.docenteSolicitante.nombre} (ID: {row.docenteSolicitante.id})</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          onClick={() => onAccept(row.id)}
        >
          ACEPTAR
        </Button>
        <Button 
<<<<<<< HEAD
          variant='contained'
          color='primary'
          onClick={() => navigate('/dashboard/sugerir-ambientes',{state: row})}
        >
          SUGERIR
        </Button>

        <Button
=======
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
          variant='contained'
          color='secondary'
          onClick={() => onSuggest()}
        >
          SUGERIR
        </Button>

        <Button
          variant='contained'
          color='error'
          onClick={() => onReject(row.id)}
        >
          RECHAZAR
        </Button>

      </Box>
    </Box>
  );
};

export default InformationVerificarSolicitudForm;
