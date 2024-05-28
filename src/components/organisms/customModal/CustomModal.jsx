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
<<<<<<< HEAD
        width: '70%',
        height: '80%',
=======
        //width: '70%',
        //height: '80%',
>>>>>>> 943e5bd30cbf61aa8eb8e9c3d9e83d96cd6d785d
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
      }}>
        <Typography id='modal-title' variant='h6' component='h2' sx={{ textAlign: 'center' }}>
<<<<<<< HEAD
          Solicitar Ambiente
=======
          {title}
>>>>>>> 943e5bd30cbf61aa8eb8e9c3d9e83d96cd6d785d
        </Typography>
        <Box id='modal-body' sx={{ mt: 6 }}>
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
