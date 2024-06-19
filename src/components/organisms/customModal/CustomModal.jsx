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
        //width: '45%',
        //height: '35%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
      }}>
        <Typography id='modal-title' variant='h6' component='h2' sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Box id='modal-body' sx={{ mt: 1 }}>
          {React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>
              {child}
              {index === 0 && <Box sx={{ mt: 2 }} />} {/* Agregar espacio solo después del primer hijo */}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomModal;
