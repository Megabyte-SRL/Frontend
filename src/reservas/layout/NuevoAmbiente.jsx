import React, { useState } from 'react'; //para modal 
import { Box, Paper, Grid, Typography, TextField, Button, Modal, Select, MenuItem, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReservaLayout from '../layout/ReservaLayout';
import { useNavigate } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from '../organisms/snackbarProvider/SnackbarProvider';

const NuevoAmbiente = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  //copiar aula y capacidad

  const [ambienteData, setAmbienteData] = useState({});
  const { openSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const edificioOptions = ['','Edificion MEMI', 'Edificio Multiacademico', 'Edificio Matematica', 'Edificio CAE', 'Eficio nuevo'];
  const pisoOptions =['',1, 2,3,4,5,6,7];

  /**VAlidadciones Formulario */

  const formik = useFormik({
    initialValues: {
      idAmbiente: "",
      capacidad: "",
      descripcion: "",
    },

    validationSchema: Yup.object({
      idAmbiente: Yup.string().matches(/^[a-zA-Z0-9@#-\s]+$/, "Ingrese solo letras, números, espacios y los caracteres @,#,-").required("Ingrese solo letras, números, espacios y los caracteres @,#,-"),
      capacidad: Yup.string().matches(/^[0-9]{1,3}$/, "Ingrese solo números enteros positivos de hasta 3 dígitos").required("Ingrese solo números"),
      descripcion: Yup.string().matches(/^[0-9\s.,();:\p{L}]+$/u, "Ingrese solo caracteres alfanuméricos").min(50, 'Mínimo 50 caracteres').max(200, 'Máximo 200 caracteres')
      .required('La descripción es requerida'),
    }),
    validateOnChange: true,
    onSubmit: (formValue) => {
      setAmbienteData({
        nombre: formValue.idAmbiente,
        capacidad: formValue.capacidad,
        descripcion: formValue.descripcion
      });
      setOpenModal(true);
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
    onSubmit: async(formValue, { resetForm }) => {
      console.log("Registro Ubicacion OK");
      console.log(formValue);

      fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/ambientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...ambienteData,
          ubicacion: {
            lugar: formValue.lugar,
            piso: formValue.piso,
            edificio: formValue.edificio
          }
        })
      })
        .then(response => {
          openSnackbar('Ambiente creado correctamente', 'success');
          resetForm();
          formik.resetForm();
          setAmbienteData({});
        })
        .catch(error => {
          openSnackbar('Error al registrar ambiente', 'error');
        })
        .finally(() => {
          setOpenModal(false);
        });
    }
  })

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
          <Typography variant="body1" align="left">Aula: {ambienteData.nombre}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" align="right">Capacidad:{ambienteData.capacidad} </Typography>
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
          <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>
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
              padding: '8%',
              width: '100%',
              maxWidth: 'auto',
              backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
            }}>
              <Typography variant="h5" align="center" gutterBottom>
                REGISTRO DE AMBIENTES
              </Typography>

              <form id='registro-ambiente-form' style={{ margin: '0  100px' }} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>Identificador de ambiente:<span style={{ color: 'red' }}> *</span></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Ingrese identificador de ambiente"
                      variant="outlined"
                      style={{ flex: 1, backgroundColor: 'white' }}
                      fullWidth
                      inputProps={{
                        maxLength: 20,
                        minLength: 5,
                        title: 'Ingrese solo letras, números, espacios y los caracteres @,#,-'
                      }}
                      name="idAmbiente"
                      onChange={formik.handleChange}
                      value={formik.values.idAmbiente}
                      error={formik.errors.idAmbiente}
                      helperText={formik.errors.idAmbiente}
                      sx={{ width: '110%' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Capacidad de ambiente:<span style={{ color: 'red' }}> *</span></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Ingrese capacidad de ambiente"
                      type="number"
                      variant="outlined"
                      style={{ flex: 1, backgroundColor: 'white' }}
                      fullWidth
                      name="capacidad"
                      onChange={formik.handleChange}
                      value={formik.values.capacidad}
                      error={formik.errors.capacidad}
                      helperText={formik.errors.capacidad}
                      sx={{ width: '110%' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Descripción de ambiente:<span style={{ color: 'red' }}> *</span></Typography>                
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Ingrese descripción de ambiente"
                      multiline
                      rows={4}
                      variant="outlined"
                      style={{ flex: 1, backgroundColor: 'white' }}
                      fullWidth
                      name="descripcion"
                      onChange={formik.handleChange}
                      value={formik.values.descripcion}
                      error={formik.errors.descripcion}
                      helperText={formik.errors.descripcion}
                      sx={{ width: '110%' }}
                    />
                  </Grid>
                </Grid>
                <Typography variant="body1" sx={{ color: 'red' }}>* Campos Obligatorios</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '0 80px' }}>
                  {/* <Button type='submit' variant="contained" color="primary" onClick={handleOpenModal}> */}
                  <Button type='submit' variant="contained" color="primary" >
                    SIGUIENTE
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
                    CANCELAR
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          {modalBody}
        </div>
      </Modal>
    </ReservaLayout>
  );
};

export default NuevoAmbiente;
