import React, { useState } from 'react'; //para modal 
import { Box, Toolbar, List, ListItem, ListItemText, Paper, Grid, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//import React from 'react';
import ReservaLayout from '../layout/ReservaLayout';

const NuevoAmbiente = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [openModal, setOpenModal] = useState(false);
  
  const handleOpenModal = () => { //controla la apertura del modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {//controla el cierre del modal
    setOpenModal(false);
  };

  const modalBody = (
    <Box
      sx={{
        position: 'absolute',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        AGREGAR UBICACION
      </Typography>
      <form>
        <TextField label="Descripción" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Edificio" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Piso" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary">
            GUARDAR
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            ANTERIOR
          </Button>
        </Box>
      </form>
    </Box>
  );



  return (
    <ReservaLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
            sx={{
    
              display: 'center',
              justifyContent: 'center',
              marginTop: matches ? '10%' : '9%', 
              background: 'black',
              minHeight: 'calc(80vh - 60px)', 
            }}
          >
            <Paper sx={{
              marginTop:'-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', // Ajusta el sombreado para el marco
              padding: '2%',
              width: '100%',
              maxWidth: 'auto',
              backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
            }}>
              <Typography variant="h5" align="center" gutterBottom>
                REGISTRO DE AMBIENTES
              </Typography>                 
              
              <form  style={{ margin: '0  100px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1">Identificador de ambiente:</Typography>
                  <TextField label="Ingrese identificador de ambiente" variant="outlined" style={{ flex: 1, backgroundColor: 'white' }} 
                        inputProps={{
                        pattern: '^[a-zA-Z0-9@#- ]+$',
                        maxLength: 20,
                        minLength: 10,
                        title: 'Ingrese solo letras, números, espacios y los caracteres @,#,-'
                      }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1">Capacidad de ambiente:</Typography>
                  <TextField label="Ingrese capacidad de ambiente" type="number" variant="outlined" style={{ flex: 1, backgroundColor: 'white' }} />
                </div>


                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1">Accesibilidad:</Typography>
                  <RadioGroup aria-label="accesibilidad" name="accesibilidad" style={{ display: 'flex', flexDirection: 'row' }} defaultValue="no">
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Typography variant="body1" sx={{ marginRight: '1rem' }}>Descripcion de ambiente:</Typography>
                    <TextField label="Ingrese descripción de ambiente" multiline rows={4} variant="outlined" style={{ flex: 1, backgroundColor: 'white' }} />
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '0 80px' }}>
                  <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    SIGUIENTE
                  </Button>
                  <Button variant="contained" color="secondary">
                    CANCELAR
                  </Button>
                </Box>
               
              </form>
              
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        {modalBody}
      </Modal>
    </ReservaLayout>
  );
};

export default NuevoAmbiente;
