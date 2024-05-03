import React from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from '../../../reservas/organisms/snackbarProvider/SnackbarProvider';
import { Button, Grid } from '@mui/material';

import CustomTextField from '../../atoms/customTextField/CustomTextField';

const SolicitarAmbienteForm = ({
  row = {},
  onClose = () => {}
}) => {

  const { openSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    capacidad: Yup.number().required('La capacidad es requerida'),
    materia: Yup.string().required('La materia es requerida'),
  })
  return (
    <Formik
      initialValues={{
        capacidad: 0,
        materia: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log('values: ', values);
        fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/solicitudesAmbientes`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            horarioDisponibleId: row.id,
            capacidad: values.capacidad,
            materia: values.materia
          })
        })
          .then(async response => {
            const data = await response.json();
            console.log('Registrar solicitud ambiente response: ', data);
            openSnackbar('Solicitud registrado exitosamente', 'success');
          })
          .catch(async error => {
            openSnackbar('Error al registrar horario', 'error');
          })
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CustomTextField
                name='capacidad'
                type='number'
                label='Capacidad'
                placeholder='Capacidad'
                touched={touched}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CustomTextField
                name='materia'
                label='Materia'
                placeholder='Materia'
                touched={touched}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={!isValid || !dirty}
              >
                Registrar
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={onClose}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default SolicitarAmbienteForm;
