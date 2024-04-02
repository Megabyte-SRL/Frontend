import React, { useState } from 'react';
import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add as AddIcon } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const TablaDatos = ({ datos }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedHora, setSelectedHora] = useState('');
  const [fecha, setFecha] = useState('');
  const [fechaError, setFechaError] = useState(false);
  const [horaError, setHoraError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showUndoButton, setShowUndoButton] = useState(false);


  const handleClick = (index) => {
    setSelectedButtonIndex(index);
    setModalData(datos[index]);
    setSelectedRowIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedButtonIndex(null);
    setSelectedRowIndex(null);
    setSelectedHora('');
    setFecha('');
    setFechaError(false);
    setHoraError(false);
  };

  const handleAceptar = () => {
    if (selectedHora === '' || fecha === '') {
      // Si alguno de los campos está vacío, establece el estado de error correspondiente
      if (selectedHora === '') setHoraError(true);
      if (fecha === '') setFechaError(true);
    } else {
      // Si ambos campos están llenos, realiza las acciones necesarias y cierra el modal
      // Aquí puedes realizar otras acciones, como enviar los datos o realizar validaciones adicionales
      setOpenModal(false);
      setSelectedButtonIndex(null);
      setSelectedRowIndex(null);
      
      // Restablecer errores a falso
      if (fechaError) setFechaError(false);
      if (horaError) setHoraError(false);

      // Muestra el Snackbar con el mensaje "Horario registrado"
      setSnackbarMessage('Horario registrado');
      setSnackbarOpen(true);
      setShowUndoButton(true);

      // Limpia los campos
      setSelectedHora('');
      setFecha('');
      
    }
  };

  const handleUndo = () => {
    // Limpia los campos
    setSelectedHora('');
    setFecha('');

    setShowUndoButton(false);
    setSnackbarOpen(false);
    setSnackbarMessage('Acción deshecha');
    setSnackbarOpen(true);
  };

  const handleHoraChange = (event) => {
    setSelectedHora(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre Ambiente</TableCell>
            <TableCell>Capacidad</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Horario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((fila, index) => (
            <TableRow
              key={index}
              sx={{ bgcolor: selectedRowIndex === index ? '#F2F2F2' : 'inherit' }}
            >
              <TableCell>{fila.fecha}</TableCell>
              <TableCell>{fila.nombreAmbiente}</TableCell>
              <TableCell>{fila.capacidad}</TableCell>
              <TableCell>{fila.descripcion}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="Agregar"
                  sx={{
                    backgroundColor: selectedButtonIndex === index ? '#176BC6' : '#545454',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: selectedButtonIndex === index ? '#176BC6' : '#545454',
                    },
                  }}
                  onClick={() => handleClick(index)}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
            AGREGAR HORARIO
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            Ambiente seleccionado
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '10%', paddingBottom: '7%' }}>
            <Typography variant="h6" gutterBottom>
              Aula: <span style={{ fontWeight: 'bold' }}>{modalData.nombreAmbiente}</span>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Capacidad: <span style={{ fontWeight: 'bold' }}>{modalData.capacidad}</span>
            </Typography>
          </div>
          <Grid container spacing={2} >
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2} sx={{marginLeft: '4%', paddingBottom: '4%' }}>
                  <Typography variant="h6" >
                    Fecha:
                    {fechaError && (
                      <Typography variant="body2" color="error" component="span">
                        &nbsp;*
                      </Typography>
                    )}
                  </Typography>
                  
                </Grid>
                <Grid item xs={3.5}>
                  <TextField id="fecha" type="date" fullWidth onChange={handleFechaChange} sx={{ mb: 1,marginLeft: '-10%' }} />
                </Grid>
                 
                <Grid item xs={2} sx={{paddingBottom: '4%' }}>
                  <Typography variant="h6" >
                      Hora:
                      {horaError && (
                        <Typography variant="body2" color="error" component="span">
                          &nbsp;*
                        </Typography>
                      )}
                    </Typography>
                </Grid>
                <Grid item xs={3.5}>
                  <Select
                    value={selectedHora}
                    onChange={handleHoraChange}
                    fullWidth
                    sx={{ mb: 3,marginLeft: '-10%'  }}
                  >
                    <MenuItem value="">Seleccione un periodo</MenuItem>
                    <MenuItem value="6:45 - 8:15">6:45 - 8:15</MenuItem>
                    <MenuItem value="8:15 - 9:45">8:15 - 9:45</MenuItem>
                    <MenuItem value="9:45 - 11:15">9:45 - 11:15</MenuItem>
                    <MenuItem value="11:15 - 12:45">11:15 - 12:45</MenuItem>
                    <MenuItem value="12:45 - 14:15">12:45 - 14:15</MenuItem>
                    <MenuItem value="14:15 - 15:45">14:15 - 15:45</MenuItem>
                    <MenuItem value="15:45 - 17:15">15:45 - 17:15</MenuItem>
                    <MenuItem value="17:15 - 18:45">17:15 - 18:45</MenuItem>
                    <MenuItem value="18:45 - 20:15">18:45 - 20:15</MenuItem>
                    <MenuItem value="20:15 - 21:45">20:15 - 21:45</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          
          {/* Agrega más campos según necesites */}
          {(fechaError||horaError)  && (
              <Typography variant="body2" color="error">
                * Campos obligatorios
              </Typography>
            )}
          <Button 
            variant="contained" 
            sx={{ 
              ml: 3, 
              marginRight:'40%',
              marginTop:'4%',
              fontSize:'120%' 
              }}
              onClick={handleAceptar}>
                Aceptar
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: '120%', // Tamaño de la fuente
              color: '#176BC6', // Color del texto (azul)
              border: '1px solid #176BC6', // Borde azul
              bgcolor: 'white', // Fondo blanco
            }}
            onClick={handleCloseModal}>
              Cancelar
          </Button>
        </Box>
      </Modal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '25rem',
          }}
        >
          {snackbarMessage}
          {showUndoButton && (
            <Button sx={{marginLeft:'5rem'}} color="inherit" size="small" onClick={handleUndo}>
              DESHACER
            </Button>
          )}
        </MuiAlert>
      </Snackbar>
    </TableContainer>
  );
};

export default TablaDatos;
