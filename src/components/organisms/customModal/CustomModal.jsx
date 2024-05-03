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
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography id='modal-title' variant='h6' component='h2'>
          {title} 
        </Typography>
        <Box id='modal-body' sx={{ mt: 2 }}>
          {children}
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
