import React from 'react';

import { Modal, Box, Typography } from '@mui/material';
import HabilitarFechaForm from '../habilitarFechaForm/HabilitarFechaForm';

const ModalHabilitarFecha = ({ open, onSuccess }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxWidth: '500px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Registrar Fechas de Inscripción
        </Typography>
        <HabilitarFechaForm onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
};

export default ModalHabilitarFecha;
