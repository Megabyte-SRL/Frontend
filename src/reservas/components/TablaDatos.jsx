import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, TextField, Button, Grid, Checkbox, FormControl, FormGroup, FormControlLabel, Popover, List, ListItem, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add as AddIcon } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const TablaDatos = ({ datos }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedHoras, setSelectedHoras] = useState([]); // Estado para almacenar las horas seleccionadas
  const [fecha, setFecha] = useState('');
  const [horasError, setHorasError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showUndoButton, setShowUndoButton] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el ancla del popover
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

    // Función para abrir el Snackbar
  const showSnackbar = () => {
    setIsSnackbarVisible(true);
  };

  // Función para cerrar el Snackbar
  const hideSnackbar = () => {
    setIsSnackbarVisible(false);
  };



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
    setSelectedHoras([]); // Limpiar las horas seleccionadas al cerrar el modal
    setFecha('');
    setFechaError(false);
  };

  const handleAceptar = async () => {
    if (selectedHoras.length === 0 || fecha === '') {
      if (selectedHoras.length === 0) setHorasError(true);
      if (fecha === '') setFechaError(true);
    } else {
      // Construir el cuerpo de la solicitud
      const cuerpoSolicitud = {
        ambiente_id: modalData.id, // Usar el ID del ambiente seleccionado
        fecha: fecha,
        horasDisponibles: selectedHoras.map(hora => ({
          horaInicio: hora.split(' - ')[0],
          horaFin: hora.split(' - ')[1]
        }))
      };

      try {
        // Enviar la solicitud POST
        const respuesta = await fetch('http://127.0.0.1:8000/api/horariosDisponibles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuerpoSolicitud)
        });

        if (!respuesta.ok) {
          throw new Error('No se pudo completar la solicitud.');
        }
        setOpenModal(false);
        // Mostrar mensaje de éxito
        setSnackbarMessage('Horario registrado');
        setSnackbarOpen(true);
        setShowUndoButton(true);

        // Limpiar estados
        setFecha('');
        setSelectedHoras([]);
      } catch (error) {
        console.error('Error al enviar los horarios:', error);
      }
    }
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
    setFechaError(false); // Actualizar el estado de error a false al cambiar la fecha
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleCheckboxChange = (hora) => () => {
    if (selectedHoras.includes(hora)) {
      setSelectedHoras(selectedHoras.filter((h) => h !== hora));
    } else {
      setSelectedHoras([...selectedHoras, hora]);
    }
    setHorasError(false); // Actualizar el estado de error a false al cambiar las horas seleccionadas
  };

  const handleSelectAll = () => {
    if (selectedHoras.length === 10) {
      setSelectedHoras([]);
    } else {
      setSelectedHoras(['6:45 - 8:15', '8:15 - 9:45', '9:45 - 11:15', '11:15 - 12:45', '12:45 - 14:15', '14:15 - 15:45', '15:45 - 17:15', '17:15 - 18:45', '18:45 - 20:15', '20:15 - 21:45']);
    }
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre Ambiente</TableCell>
            <TableCell>Capacidad</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Horario</TableCell>
          </TableRow> 
        </TableHead>
        <TableBody>
        {Array.isArray(datos) && datos.map((fila, index) => (
            <TableRow
              key={index}
              sx={{ bgcolor: selectedRowIndex === index ? '#F2F2F2' : 'inherit' }}
            >
              <TableCell>{fila.nombre}</TableCell>
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
                  <TextField 
                    id="fecha" 
                    type="date" 
                    fullWidth 
                    onChange={handleFechaChange} 
                    InputProps={{
                      inputProps: { 
                        locale: 'es' 
                      } 
                    }}
                    sx={{ mb: 1,marginLeft: '-5%' }} 
                  />
                  {fechaError && (
                    <Typography variant="body2" color="error">
                      * Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                
              <Grid item xs={2} sx={{paddingBottom: '4%' }}>
                <Typography variant="h6" >
                    Hora:
                    {horasError && (
                      <Typography variant="body2" color="error" component="span">
                        &nbsp;*  
                      </Typography>
                    )}
                  </Typography>
              </Grid>
                <Grid item xs={3.5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePopoverClick}
                    sx={{ mb: 3,marginLeft: '-10%'  }}
                  >
                    Seleccione horarios
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <List>
                      <ListItem dense button onClick={handleSelectAll}>
                        <ListItemText primary="Seleccionar todo" />
                        <Checkbox checked={selectedHoras.length === 10} />
                      </ListItem>
                      {['6:45 - 8:15', '8:15 - 9:45', '9:45 - 11:15', '11:15 - 12:45', '12:45 - 14:15', '14:15 - 15:45', '15:45 - 17:15', '17:15 - 18:45', '18:45 - 20:15', '20:15 - 21:45'].map((hora, index) => (
                        <ListItem key={index} dense button onClick={handleCheckboxChange(hora)}>
                          <ListItemText primary={hora} />
                          <Checkbox checked={selectedHoras.includes(hora)} />
                        </ListItem>
                      ))}
                    </List>
                  </Popover>
                  {horasError && (
                    <Typography variant="body2" color="error">
                      * Campo obligatorio
                    </Typography>
                  )}
                 </Grid>
              </Grid>
          </Grid>

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
            width: '20rem',
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </TableContainer>
  );
};

export default TablaDatos;
