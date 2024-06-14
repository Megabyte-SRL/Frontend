import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { green, red, yellow } from '@mui/material/colors';

const InformationVerificarSolicitudForm = ({
  row = {},
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const navigate = useNavigate(); // Importante: usar useNavigate para la navegación

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
          onClick={() => onSubmit(row.id)}
        >
          ACEPTAR
        </Button>
        <Button 
          variant='contained'
          color='primary'
          onClick={() => navigate('/dashboard/sugerir-ambientes',{state: row})}
        >
          SUGERIR
        </Button>

        <Button
          variant='contained'
          color='secondary'
          onClick={onClose}
        >
          RECHAZAR
        </Button>

      </Box>
    </Box>
  );
};

export default InformationVerificarSolicitudForm;
