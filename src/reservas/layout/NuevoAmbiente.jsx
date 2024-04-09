import React, { useState } from 'react'; //para modal 
import { Box, Toolbar, List, ListItem, ListItemText, Paper, Grid, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button, Modal, Select, MenuItem, InputLabel, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReservaLayout from '../layout/ReservaLayout';

const NuevoAmbiente = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  //copiar aula y capacidad
  const [aulaValue, setAulaValue] = useState('');
  const [capacidadValue, setCapacidadValue] = useState('');
  const [descripcionValue, setDescripcionValue] = useState('');
  //05042024 json
  const [lugarValue, setLugarValue] = useState('');
  const [pisoValue, setPisoValue] = useState('');
  const [edificioValue, setEdificioValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAulaChange = (event) => {
    setAulaValue(event.target.value);
  };

  const handleCapacidadChange = (event) => {
    setCapacidadValue(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcionValue(event.target.value);
  };
  //manejamos lugar y piso 05042024
  const handleLugarChange = (event) => {
    setLugarValue(event.target.value);
  };

  const handlePisoChange = (event) => {
    setPisoValue(event.target.value);
  };

  const handleEdificioChange = (event) => {
    setEdificioValue(event.target.value);
  };

  const alertStyle = {
    position: 'fixed',
    bottom: 20,
    //left: '50%',
    right: 0,
    transform: 'translateX(-50%)',
    zIndex: 1000, // Asegura que la alerta esté por encima de otros elementos
    animation: 'slide-in 0.5s forwards', // Agrega una animación de desplazamiento
  };
  
  const alertAnimation = `@keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(-50%); opacity: 1; }
  }`;
  

  const handleSubmit = async () => {
    const formData = {
      nombre: aulaValue,
      capacidad: capacidadValue,
      descripcion: descripcionValue,
      ubicacion: {
        lugar: lugarValue,
        piso: pisoValue,
        edificio: edificioValue
      }
    };
    try {
      const response = await fetch('http://localhost:8080/api/ambientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        // Manejar respuesta exitosa
        setSuccessMessage(data.msg);
        setErrorMessage('');
      } else {
        // Manejar errores
        setErrorMessage(data.msg);
        setSuccessMessage('');
      }
      setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);

    } catch (error) {
      console.error('Errori:', error);
      console.log('Error type:', typeof error); // Imprimir el tipo de error
      console.log('Error object:', error); // Imprimir el objeto de error
      // Verificar si hay un error de conexión
      if (error instanceof TypeError) {
        setErrorMessage('Sin conexion al servidor');
      } else {
        setErrorMessage('Error al procesar la solicitud.');
      } 
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      
      //setSuccessMessage('');
      
    }
  };
  

  const [openModal, setOpenModal] = useState(false);
  
  const handleOpenModal = () => { //controla la apertura del modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {//controla el cierre del modal
    setOpenModal(false);
  };
  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage('');
  };

  const edificioOptions = ['','Edificion MEMI', 'Edificio Multiacademico', 'Edificio Matematica', 'Edificio CAE'];
  const pisoOptions =['',1, 2,3,4,5,6,7];

  const modalBody = (
    <Box
      sx={{
        position: 'absolute',
        width: 600,
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
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body1" align="left">Aula: {aulaValue}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" align="right">Capacidad:{capacidadValue} </Typography>
      </Grid>
      </Grid>
      <form>
        <TextField label="Lugar" fullWidth variant="outlined" sx={{ mb: 2 }} onChange={handleLugarChange}
          value={lugarValue} />
        <Box sx={{ mb: 2 }}>
          <InputLabel id="piso-label">Piso</InputLabel>
          <Select labelId="piso-label" id="piso" fullWidth variant="outlined" onChange={handlePisoChange}
            value={pisoValue}>
            {pisoOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>


        <Box sx={{ mb: 2 }}>
          <InputLabel id="edificio-label">Edificio</InputLabel>
          <Select labelId="edificio-label" id="edificio" fullWidth variant="outlined" onChange={handleEdificioChange}
            value={edificioValue}>
          
            {edificioOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
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
                  <TextField label="Ingrese identificador de ambiente" variant="outlined" 
                        style={{ flex: 1, backgroundColor: 'white' }} 
                        inputProps={{
                        pattern: '^[a-zA-Z0-9@#- ]+$',
                        maxLength: 20,
                        minLength: 10,
                        title: 'Ingrese solo letras, números, espacios y los caracteres @,#,-'
                      }
                    }
                    onChange={handleAulaChange}
                    value={aulaValue}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1">Capacidad de ambiente:</Typography>
                  <TextField onChange={handleCapacidadChange} value={capacidadValue} label="Ingrese capacidad de ambiente" type="number" variant="outlined" style={{ flex: 1, backgroundColor: 'white' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Typography variant="body1" sx={{ marginRight: '1rem' }}>Descripcion de ambiente:</Typography>
                    <TextField onChange={handleDescripcionChange} value={descripcionValue}label="Ingrese descripción de ambiente" multiline rows={4} variant="outlined" style={{ flex: 1, backgroundColor: 'white' }} />
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
        <div>
          {modalBody}
          <style>{alertAnimation}</style> {/* Agrega la animación al estilo */}
          {showAlert && ( // Mostrar alertas solo si showAlert es true
             <div style={alertStyle}>
              <React.Fragment>
                
                
                  {successMessage && ( // Mostrar la Alerta de éxito solo si successMessage está presente
                    <Alert elevation={6} variant="filled"
                    sx={{...alertStyle, display: 'flex', justifyContent: 'space-between', 
                    alignItems: 'center', width: '25rem'}}
                    severity="success" onClose={() => setShowAlert(false)}>
                      {successMessage}
                    </Alert>
                  )}
                  {errorMessage && ( // Mostrar la Alerta de error solo si errorMessage está presente
                    <Alert elevation={6} variant="filled"
                    sx={{...alertStyle, display: 'flex', justifyContent: 'space-between', 
                    alignItems: 'center', width: '25rem'}}
                    severity="error" onClose={() => setShowAlert(false)}>
                      {errorMessage}
                    </Alert>
                  )}
                
              </React.Fragment>
            </div>
          )}
        </div>
        
      </Modal>
    </ReservaLayout>
    
  );
};

export default NuevoAmbiente;
