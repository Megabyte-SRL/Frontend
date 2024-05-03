import React from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';

import CustomTextField from '../../atoms/customTextField/CustomTextField';

const SolicitarAmbienteForm = ({
  row = {},
  onClose = () => {},
  onSubmit = () => {}
}) => {

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
      onSubmit={async (values, { resetForm }) => {
        onSubmit({ ...values, id: row.id });
        resetForm();
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
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
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
