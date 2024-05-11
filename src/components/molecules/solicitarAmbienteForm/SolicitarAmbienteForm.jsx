import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography } from '@mui/material';

const SolicitarAmbienteForm = ({
  row = {},
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const validationSchema = Yup.object({
    capacidad: Yup.number().required('La capacidad es requerida'),
    materia: Yup.string().required('La materia es requerida'),
    docente: Yup.string().required('El docente es requerido'),
    tipoReserva: Yup.string().required('El tipo de reserva es requerido'),
  });

  const fechaActual = new Date().toLocaleDateString('es-ES');

  return (
    <Formik
      initialValues={{
        capacidad: 0,
        materia: '',
        detalleReserva: '',
        docente: '',
        tipoReserva: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        onSubmit({ ...values, id: row.id });
        resetForm();
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
            <Grid item xs={12} sx={{ mt: -6, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="subtitle1">
                 {fechaActual}
              </Typography>
            </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name='capacidad'
                type='number'
                label='Capacidad'
                placeholder='Capacidad'
                fullWidth
                error={touched.capacidad && Boolean(errors.capacidad)}
                helperText={touched.capacidad ? errors.capacidad : ''}
                variant='outlined'
                sx={{ mb: 5 }}
              />
              <Field
                as={TextField}
                name='detalleReserva'
                label='Detalle de Reserva'
                placeholder='Detalle de Reserva'
                fullWidth
                multiline
                rows={5}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name='materia'
                label='Materia'
                placeholder='Materia'
                fullWidth
                error={touched.materia && Boolean(errors.materia)}
                helperText={touched.materia ? errors.materia : ''}
                variant='outlined'
                sx={{ mb: 5 }}
              />
              <Field
                as={TextField}
                name='docente'
                label='Docente'
                placeholder='Docente'
                fullWidth
                error={touched.docente && Boolean(errors.docente)}
                helperText={touched.docente ? errors.docente : ''}
                variant='outlined'
                sx={{ mb: 5 }}
              />
              <Field
                as={TextField}
                name='tipoReserva'
                label='Tipo de Reserva'
                placeholder='Tipo de Reserva'
                fullWidth
                error={touched.tipoReserva && Boolean(errors.tipoReserva)}
                helperText={touched.tipoReserva ? errors.tipoReserva : ''}
                variant='outlined'
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
