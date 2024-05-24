import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Checkbox, MenuItem } from '@mui/material';

const SolicitarAmbienteForm = ({
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const validationSchema = Yup.object({
    grupo: Yup.string().required('La materia es requerida'),
    capacidad: Yup.number().required('La capacidad es requerida'),
    materia: Yup.string().required('La materia es requerida'),
    tipoReserva: Yup.string().required('El tipo de reserva es requerido'),
  });

  const [fechaHora, setFechaHora] = useState(new Date());
  const [fechaRegistro, setFechaRegistro] = useState(null);
  const [pesoTotal, setPesoTotal] = useState(0);
  const [pesoTipoReserva, setPesoTipoReserva] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const obtenerFechaHoraActual = () => {
    setFechaRegistro(new Date());
  };

  const actualizarPesoDocentes = (docentes) => {
    const peso = docentes.length;
    setPesoTotal(peso + pesoTipoReserva);
  };

  const actualizarPesoTipoReserva = (nuevoTipoReserva) => {
    let peso = 0;
    switch (nuevoTipoReserva) {
      case 'Examen Mesa':
      case 'Parcial':
        peso = 2;
        break;
      case 'Emergencia':
        peso = 3;
        break;
      case 'Clases normal':
      default:
        peso = 1;
        break;
    }
    setPesoTotal((prevPeso) => prevPeso - pesoTipoReserva + peso);
    setPesoTipoReserva(peso);
  };

  const fechaActual = fechaHora.toLocaleDateString('es-ES');
  const horaActual = fechaHora.toLocaleTimeString('es-ES');

  const materias = ['Matemáticas', 'Ciencias', 'Historia', 'Literatura'];
  const docentes = ['Juan Pérez', 'María García', 'Luis Martínez', 'Ana López'];
  const tiposReserva = ['Examen Mesa', 'Clases normal', 'Parcial', 'Emergencia'];

  return (
    <Formik
      initialValues={{
        grupo: '',
        capacidad: 0,
        materia: '',
        detalleReserva: '',
        docentes: [],
        tipoReserva: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        onSubmit({ ...values, id: new Date().getTime() });
        resetForm();
        obtenerFechaHoraActual();
      }}
    >
      {({ values, errors, touched, isValid, dirty, setFieldValue }) => (
        <Form>
          <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: -4 }}>
            {fechaActual} - {horaActual}
          </Typography>
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
                select
                name='materia'
                label='Materia'
                fullWidth
                error={touched.materia && Boolean(errors.materia)}
                helperText={touched.materia ? errors.materia : ''}
                variant='outlined'
                sx={{ mb: 5 }}
              >
                {materias.map((materia) => (
                  <MenuItem key={materia} value={materia}>
                    {materia}
                  </MenuItem>
                ))}
              </Field>
              <Typography variant="subtitle1">Docentes:</Typography>
              <Field
                as={TextField}
                select
                name='docentes'
                label='Docentes'
                fullWidth
                variant='outlined'
                sx={{ mb: 5 }}
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => selected.join(', '),
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                    },
                  },
                }}
                onChange={(e) => {
                  const { value } = e.target;
                  setFieldValue('docentes', value);
                  actualizarPesoDocentes(value);
                }}
              >
                {docentes.map((docente) => (
                  <MenuItem key={docente} value={docente}>
                    <Checkbox checked={values.docentes.includes(docente)} />
                    <Typography>{docente}</Typography>
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                select
                name='tipoReserva'
                label='Tipo de Reserva'
                fullWidth
                error={touched.tipoReserva && Boolean(errors.tipoReserva)}
                helperText={touched.tipoReserva ? errors.tipoReserva : ''}
                variant='outlined'
                sx={{ mb: 5 }}
                onChange={(e) => {
                  setFieldValue('tipoReserva', e.target.value);
                  actualizarPesoTipoReserva(e.target.value);
                }}
              >
                {tiposReserva.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Decentes combinados</InputLabel>
                {loadingDocentes ? (
                  <CircularProgress size={24} />
                ) : (
                  <Field
                    as={Select}
                    name='docentes'
                    label='Dodentes combinados'
                    multiple
                    value={values.docentes}
                    onChange={(event) => {
                      setFieldValue('docentes', event.target.value);
                    }}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={obtenerDocenteNombreById(value)}
                          />
                        ))}
                      </Box>
                    )}
                    fullWidth
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                  >
                    {docentes.map(docente => (
                      <MenuItem key={docente.id} value={docente.id}>
                        {docente.nombre} {docente.apellido}
                      </MenuItem>
                    ))}
                  </Field>
                )}
              </FormControl>
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
          {fechaRegistro && (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              Fecha y hora de registro: {fechaRegistro.toLocaleString('es-ES')}
            </Typography>
          )}
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Peso total: {pesoTotal}
          </Typography>
        </Form>
      )}
    </Formik>
  );
}

export default SolicitarAmbienteForm;
