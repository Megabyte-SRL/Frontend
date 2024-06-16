import React, { useState, useEffect, useRef } from 'react';
import './modal.css';
import { IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {Stack, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
 }, [modalRef, onClose]);


  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div ref={modalRef} className={`modal ${isOpen ? 'open' : ''}`} onClick={handleModalClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2 style={{ marginTop: '0', fontSize: '24px', color:'black' }}>Notificaciones</h2>
        <div>
        <List sx={{ width: '100%', maxWidth: 360,}} style={{ marginTop: '-25px' }}>
        <ListItem alignItems="flex-start" sx={{ backgroundColor: '#EDF3FA' }}>
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Administrador
                  </Typography>
                  {' — '}
                  {"Su solicitud fue RECHAZADA. Tiene una sugerencia de ambiente"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Administrador
                  </Typography>
                  {' — '}
                  {"Su solicitud de ambiente fue ACEPTADA"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Leticia Coca  
                  </Typography>
                  {' — '}
                  {'Rechazo la sugerencia de Ambiente'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="App">
      <IconButton onClick={openModal}>
        <Stack spacing={4} direction="row" sx={{ color: '#FFFFFF' }}>
          <Badge color="error" badgeContent={2} max={9} invisible={modalOpen}>
            <NotificationsIcon sx={{ fontSize: 30 }}/>
          </Badge>
        </Stack>
      </IconButton>
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
