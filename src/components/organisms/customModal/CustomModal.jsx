import React from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

const CustomModal = ({
  open = false,
  onClose = () => {},
  title = '',
  children
}) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
      }}>
        <Typography id='modal-title' variant='h6' component='h2' sx={{ textAlign: 'center' }}>
          Solicitar Ambiente
        </Typography>
        <Box id='modal-body' sx={{ mt: 6 }}>
          {React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>
              {child}
              {index === 0 && <Box sx={{ mt: 2 }} />} {/* Agregar espacio solo después del primer hijo */}
            </React.Fragment>
          ))}
        </Box>
        {/*
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={() => console.log('selected')}>
            Aceptar
          </Button>
        </Box>
        */}
      </Box>
    </Modal>
  );
}

export default CustomModal;
