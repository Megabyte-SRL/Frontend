import React from 'react';

import { Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Popover, Box, Chip } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const FormAgregarHorario = ({
  row = {},
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const horas = ['6:45 - 8:15', '8:15 - 9:45', '9:45 - 11:15', '11:15 - 12:45', '12:45 - 14:15', '14:15 - 15:45', '15:45 - 17:15', '17:15 - 18:45', '18:45 - 20:15', '20:15 - 21:45'];

  const validationSchema = Yup.object({
    fecha: Yup.string().required('La fecha disponible es requerida'),
    horas: Yup.array().of(Yup.string()).min(1, 'Seleccione al menos una hora').required('La hora es requerida'),
  });

  return (
    <Formik
      initialValues={{
        fecha: new Date().toISOString().substring(0, 10),
        horas: []
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        onSubmit({ ...values, id: row.id });
        resetForm();
      }}
    >
      {({ handleSubmit, setFieldValue, values, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <Typography variant='h5' gutterBottom sx={{ textAlign: 'center' }}>
            Ambiente seleccionado
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '10%', paddingBottom: '7%' }}>
            <Typography variant="h6" gutterBottom>
              Aula: <span style={{ fontWeight: 'bold' }}>{row.nombre}</span>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Capacidad: <span style={{ fontWeight: 'bold' }}>{row.capacidad}</span>
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Field
                component={TextField}
                name='fecha'
                type='date'
                label='Fecha'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Horas</InputLabel>
                <Field
                  name='horas'
                  as={Select}
                  label='Horas'
                  multiple
                  value={values.horas}
                  onChange={(event) => {
                    setFieldValue('horas', event.target.value)
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => <Chip key={value} label={value} />)}
                    </Box>
                  )}
                  fullWidth
                >
                  {horas.map((hora) => (
                    <MenuItem key={hora} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={!isValid}
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

export default FormAgregarHorario;
