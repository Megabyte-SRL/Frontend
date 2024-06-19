import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { useSnackbar } from '../../../reservas/organisms/snackbarProvider/SnackbarProvider';

// Background color based on status
const getBackgroundColor = (status) => {
  switch (status) {
    case 'pending':
      return '#e3f2fd';
    case 'registrado':
      return '#e0f2f1';
    case 'rechazado':
    case 'disponible':
      return '#ffebee';
    default:
      return '#ffffff';
  }
};

const AdminNotification = ({ notification, onAction }) => {
  const { openSnackbar } = useSnackbar();

  const handleAcceptReserva = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/aprobarSolicitud/${solicitudId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
        onAction(solicitudId, 'registrado');
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleRejectReserva = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/rechazarSolicitud/${solicitudId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
        onAction(solicitudId, 'rechazado');
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  return (
    <MenuItem
      onClick={() => {}}
      sx={{ backgroundColor: getBackgroundColor(notification.estado), margin: '10px' }}
    >
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {notification.docente.nombre} {notification.docente.apellido}
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          {notification.docente.nombre} ha aceptado la sugerencia de ambiente {notification.horarioDisponible.ambiente}
        </Typography>
        {notification.estado === 'aceptado' ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 4, py: 1 }}>
            <Button variant="contained" color="primary" onClick={() => handleAcceptReserva(notification.id)}>
              Registrar
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleRejectReserva(notification.id)} sx={{ marginLeft: '5%' }}>
              Rechazar
            </Button>
          </Box>
        ) : (
          <Typography color="primary" variant="body2" align="center" sx={{ py: 1 }}>
            {notification.estado === 'reservado' ? 'Registrado' : 'Rechazado'}
          </Typography>
        )}
      </Box>
    </MenuItem>
  );
};

export default AdminNotification;
