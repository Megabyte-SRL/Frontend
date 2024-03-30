import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add as AddIcon } from '@mui/icons-material';

const TablaDatos = ({ datos }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClick = (index) => {
    setSelectedButtonIndex(index);
    setModalData(datos[index]); // Establecer los datos del elemento seleccionado
    setSelectedRowIndex(index); // Establecer la fila seleccionada
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedButtonIndex(null); // Restablecer el estado del botón seleccionado
    setSelectedRowIndex(null); // Restablecer el estado de la fila seleccionada
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Facultad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre Ambiente</TableCell>
            <TableCell>Capacidad</TableCell>
            <TableCell>Carrera</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Horario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((fila, index) => (
            <TableRow 
              key={index} 
              sx={{ backgroundColor: selectedRowIndex === index ? '#F2F2F2' : 'inherit' }} // Cambiar el color de fondo de la fila seleccionada
            >
              <TableCell>{fila.facultad}</TableCell>
              <TableCell>{fila.fecha}</TableCell>
              <TableCell>{fila.nombreAmbiente}</TableCell>
              <TableCell>{fila.capacidad}</TableCell>
              <TableCell>{fila.carrera}</TableCell>
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
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom 
          sx={{ textAlign: 'center' }}>
            AGREGAR HORARIO
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
            Ambiente seleccionado
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '10%', paddingBottom: '7%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Nombre Ambiente: <span style={{ fontWeight: 'bold' }}>{modalData.nombreAmbiente}</span>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Capacidad: <span style={{ fontWeight: 'bold' }}>{modalData.capacidad}</span>
            </Typography>
          </div>
          <TextField
            id="facultad"
            label="Facultad"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="fecha"
            label="Fecha"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* Agrega más campos según necesites */}
          <Button variant="contained" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="contained" sx={{ ml: 2 }}>Guardar</Button>
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default TablaDatos;
