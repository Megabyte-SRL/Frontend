import React from 'react';

import { Box, Modal, Typography } from '@mui/material';

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
        //width: '70%',
        //height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
      }}>
        <Typography id='modal-title' variant='h6' component='h2' sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Box id='modal-body' sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomModal;
