import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

const InformacionSugerenciaAceptadaForm = ({
  row = {},
  onClose = () => {},
  onAccept = () => {},
  onReject = () => {},
}) => {
  console.log('InformationSugerenciaAceptadaForm: ', row);
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
      <Typography variant='h5' align='center' gutterBottom>
        Detalles de la sugerencia aceptada
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Fecha:</Typography>
          </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{row.horarioDisponible.fecha}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Ambiente:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{row.horarioDisponible.ambiente}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Horario:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{row.horarioDisponible.horario}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Capacidad Solicitada:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{row.capacidad}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Estado:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{row.estado}</Typography>
            </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          onClick={() => onAccept()}
        >
          ACEPTAR
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => onReject()}
        >
          RECHAZAR
        </Button>
      </Box>
    </Box>
  );
};

export default InformacionSugerenciaAceptadaForm;
