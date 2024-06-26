import React from 'react';

import * as Yup from 'yup';

import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import CustomFormCard from '../../components/molecules/customFormCard/CustomFormCard';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const HabilitarFechaPage = () => {
  const customStyles = {
    minHeight: '100vh',
    padding: 4,
  };

  const { openSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    fechaInicio: Yup.date().required('La fecha de inicio es requerida'),
    fechaFin: Yup.date().required('La fecha de fin es requerida')
      .test(
        'is-greater',
        'La fecha de fin debe ser posterior o igual a la fecha de inicio',
        function(value) {
          const { fechaInicio } = this.parent;
          return value >= fechaInicio;
        }
      ),
  });

  return (
    <CustomFormCard titulo='Registrar fechas de inscripción' styles={customStyles}>
      <Formik
        initialValues={{
          fechaInicio: '',
          fechaFin: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/usuarios`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
          })
            .then(async response => {
              const data = await response.json();
              console.log('Registrar fechas de inscripcion response: ', data);
              openSnackbar('Fechas de inscripción registradas correctamente', 'success');
              resetForm();
            })
            .catch(async error => {
              openSnackbar('Error al registrar fechas de inscripción', 'error');
            });
        }}
      >
        {({ isValid, dirty, errors, touched, values, initialValues }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  name='fechaInicio'
                  type='date'
                  label='Fecha inicio'
                  variant='outlined'
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={touched.fechaInicio && Boolean(errors.fechaInicio)}
                  helperText={<ErrorMessage name="fechaInicio" />}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Field
                  as={TextField}
                  name="fechaFin"
                  type="date"
                  label="Fecha Fin"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={touched.fechaFin && Boolean(errors.fechaFin)}
                  helperText={<ErrorMessage name="fechaFin" />}
                />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    disabled={!isValid || !dirty }
                    fullWidth
                  >
                    Habilitar
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2, mb: 2}}>
                <Box
                  sx={{
                    borderRadius: '5px',
                    padding: '10px',
                    marginTop: '20px',
                  }}
                >
                  <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <a target='_blank' href="http://www.fcyt.umss.edu.bo/" rel="noreferrer" >Noticias Facultad Ciencias y tecnologia</a>
                  </Typography>
                  <Typography
                    variant='body1'
                    textAlign="center"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <a target='_blank' href="http://websis.umss.edu.bo/cron_inscripcion.asp?ID=127&SERVICIO=u&codser=UMSS&idCat=36" rel="noreferrer" >Cronograma de inscripciones umss</a>
                  </Typography>
                </Box>
              </Grid>

            </Grid>
          </Form>
        )}
      </Formik>
    </CustomFormCard>
  );
}

export default HabilitarFechaPage;
