import React, { useState } from 'react'; //para modal 
import { Box, Toolbar, List, ListItem, ListItemText, Paper, Grid, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button, Modal, Select, MenuItem,InputLabel, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//import React from 'react';
import ReservaLayout from '../layout/ReservaLayout';

import { useFormik } from "formik";
import * as Yup from "yup";


const NuevoAmbiente = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  //copiar aula y capacidad

  const [aulaValue, setAulaValue] = useState('');
  const [capacidadValue, setCapacidadValue] = useState('');
  const [descripcionValue, setDescripcionValue] = useState('');

  const [lugarValue, setLugarValue] = useState('');
  const [pisoValue, setPisoValue] = useState('');
  const [edificioValue, setEdificioValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAulaChange = (event) => {
    setAulaValue(event.target.value);
  };

  const handleCapacidadChange = (event) => {
    setCapacidadValue(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes usar los valores de aulaValue y capacidadValue como desees
    console.log('Aula:', aulaValue);
    console.log('Capacidad:', capacidadValue);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => { //controla la apertura del modal
    // if(aulaValue=='')
    //   alert('campos erroneos')
    // else

    setOpenModal(true);
  };

  const handleCloseModal = () => {//controla el cierre del modal
    setOpenModal(false);
  };


  /**VAlidadciones Formulario */

  const formik = useFormik({
    initialValues: {
      idAmbiente: "",
      capacidad: "",
      descripcion: "",

    },

    validationSchema: Yup.object({
      idAmbiente: Yup.string().matches(/^[a-zA-Z0-9@#-]+$/, "Ingrese solo letras, números, espacios y los caracteres @,#,-").required("Ingrese solo letras, números, espacios y los caracteres @,#,-"),
      capacidad: Yup.string().required("Ingrese solo numeros"),
      descripcion: Yup.string().min(50, 'Solo caracteres alfanumericos.Max:200 Min:50 \n no se permiten caracteres especiales.').max(200, 'Solo caracteres alfanumericos.Max:200 Min:50 \n no se permiten caracteres especiales.').required('Solo caracteres alfanumericos.Max:200 Min:50 \n no se permiten caracteres especiales.'),

    }),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log("Registro OK");
      setAulaValue(formValue.idAmbiente);
      setCapacidadValue(formValue.capacidad);
      setDescripcionValue(formValue.descripcion);
      handleOpenModal(formValue);
      console.log(formValue);

      if (aulaValue == '' || capacidadValue == '' || descripcionValue == '')
        console.log('verificarDatos')
      else {
        handleOpenModal();
      }
    }
  })

  const formik2 = useFormik({
    initialValues: {

      lugar: "",
      piso: "",
      edificio: ""
    },

    validationSchema: Yup.object({

      lugar: Yup.string().required("Lugar Requerido"),
      piso: Yup.string(),
      edificio: Yup.string(),


    }),
    validateOnChange: false,
    onSubmit: async(formValue) => {
      console.log("Registro Ubicacion OK");
      setLugarValue(formValue.lugar)
      setPisoValue(formValue.piso)
      setEdificioValue(formValue.edificio)
      console.log(formValue);

      const formData = {
        aula: aulaValue,
        capacidad: capacidadValue,
        descripcion: descripcionValue,
        ubicacion: {
          lugar: formValue.lugar,
          piso: formValue.piso,
          edificio: formValue.edificio
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
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error al procesar la solicitud.');
        setSuccessMessage('');
      }


      console.log("mostrando objeto")
      console.log(formData);

      handleCloseModal();

    }
  })



  const edificioOptions = ['', 'Edificion MEMI', 'Edificio Multiacademico', 'Edificio Matematica', 'Edificio CAE'];
  const pisoOptions = ['', '1er Piso', '2do Piso', '3er Piso', '4to Piso', '5to Piso', '6to Piso'];

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
      <form onSubmit={formik2.handleSubmit}>
        <TextField label="Lugar" fullWidth variant="outlined" sx={{ mb: 2 }}
          name="lugar"
          onChange={formik2.handleChange}
          value={formik2.values.lugar}
          error={formik2.errors.lugar}
          helperText={formik2.errors.lugar}
        />

        <Box sx={{ mb: 2 }}>
          <InputLabel id="piso-label">Piso</InputLabel>
          <Select labelId="piso-label" id="piso" fullWidth variant="outlined"
            name='piso'
            onChange={formik2.handleChange}
            value={formik2.values.piso}
            error={formik2.errors.piso}
            helperText={formik2.errors.piso}
          >
            {pisoOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>


        <Box sx={{ mb: 2 }}>
          <InputLabel id="edificio-label">Edificio</InputLabel>
          <Select label="Edificio" fullWidth variant="outlined"
            name="edificio"
            onChange={formik2.handleChange}
            value={formik2.values.edificio}
            error={formik2.errors.edificio}
            helperText={formik2.errors.edificio}
          >
            {edificioOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button type='submit' variant="contained" color="primary" >
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
              marginTop: '-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', // Ajusta el sombreado para el marco
              padding: '2%',
              width: '100%',
              maxWidth: 'auto',
              backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
            }}>
              <Typography variant="h5" align="center" gutterBottom>
                REGISTRO DE AMBIENTES
              </Typography>

              <form style={{ margin: '0  100px' }} onSubmit={formik.handleSubmit}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1">Identificador de ambiente:</Typography>
                  <TextField label="Ingrese identificador de ambiente" variant="outlined"
                    style={{ flex: 1, backgroundColor: 'white' }}
                    inputProps={{
                      //pattern: '^[a-zA-Z0-9@#- ]+$',
                      maxLength: 20,
                      minLength: 10,
                      title: 'Ingrese solo letras, números, espacios y los caracteres @,#,-'
                    }
                    }
                    //onChange={handleAulaChange}
                    //value={aulaValue}
                    name="idAmbiente"
                    onChange={formik.handleChange}
                    value={formik.values.idAmbiente}
                    error={formik.errors.idAmbiente}
                    helperText={formik.errors.idAmbiente}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1">Capacidad de ambiente:</Typography>
                  <TextField
                    // onChange={handleCapacidadChange}
                    //value={capacidadValue}
                    label="Ingrese capacidad de ambiente"
                    type="number"
                    variant="outlined"
                    style={{ flex: 1, backgroundColor: 'white' }}
                    name="capacidad"
                    onChange={formik.handleChange}
                    value={formik.values.capacidad}
                    error={formik.errors.capacidad}
                    helperText={formik.errors.capacidad}
                  />

                </div>




                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1" sx={{ marginRight: '1rem' }}>Descripcion de ambiente:</Typography>
                  <TextField
                    label="Ingrese descripción de ambiente"
                    multiline rows={4} variant="outlined"
                    style={{ flex: 1, backgroundColor: 'white' }}
                    name="descripcion"
                    onChange={formik.handleChange}
                    value={formik.values.descripcion}
                    error={formik.errors.descripcion}
                    helperText={formik.errors.descripcion}
                  />
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '0 80px' }}>
                  {/* <Button type='submit' variant="contained" color="primary" onClick={handleOpenModal}> */}


                  <Button type='submit' variant="contained" color="primary" >
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
