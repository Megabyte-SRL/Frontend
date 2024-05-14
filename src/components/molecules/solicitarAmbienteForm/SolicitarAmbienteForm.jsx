import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Checkbox, MenuItem } from '@mui/material';

const SolicitarAmbienteForm = ({
  row = {},
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const validationSchema = Yup.object({
    capacidad: Yup.number().required('La capacidad es requerida'),
    materia: Yup.string().required('La materia es requerida'),
    tipoReserva: Yup.string().required('El tipo de reserva es requerido'),
  });

  const [fechaHora, setFechaHora] = useState(new Date());
  const [fechaRegistro, setFechaRegistro] = useState(null); // Variable para almacenar la fecha de registro
  const [pesoTotal, setPesoTotal] = useState(0); // Variable para almacenar el peso total

  useEffect(() => {
    const interval = setInterval(() => {
      setFechaHora(new Date());
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(interval);
  }, []); // Ejecutar solo una vez al montar el componente

  const obtenerFechaHoraActual = () => {
    const fechaHoraActual = new Date();
    setFechaRegistro(fechaHoraActual);
  };

  const handleSeleccionDocente = (docente, seleccionado) => {
    if (seleccionado) {
      setPesoTotal(prevPeso => prevPeso + 1); // Aumentar el peso si se selecciona un docente
    } else {
      setPesoTotal(prevPeso => prevPeso - 1); // Disminuir el peso si se deselecciona un docente
    }
  };

  const handleSeleccionTipoReserva = (tipoReserva) => {
    switch (tipoReserva) {
      case 'Examen Mesa':
      case 'Parcial':
        setPesoTotal(prevPeso => prevPeso + 2);
        break;
      case 'Emergencia':
        setPesoTotal(prevPeso => prevPeso + 3);
        break;
      case 'Clases normal':
      default:
        setPesoTotal(prevPeso => prevPeso + 1);
        break;
    }
  };

  const fechaActual = fechaHora.toLocaleDateString('es-ES');
  const horaActual = fechaHora.toLocaleTimeString('es-ES');

  const materias = ['Matemáticas', 'Ciencias', 'Historia', 'Literatura'];
  const docentes = ['Juan Pérez', 'María García', 'Luis Martínez', 'Ana López'];
  const tiposReserva = ['Examen Mesa', 'Clases normal', 'Parcial', 'Emergencia'];

  return (
    <Formik
      initialValues={{
        capacidad: 0,
        materia: '',
        detalleReserva: '',
        docentes: [],
        tipoReserva: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        onSubmit({ ...values, id: row.id });
        resetForm();
        obtenerFechaHoraActual(); // Al enviar el formulario, se registra la fecha y hora actual
      }}
    >
      {({ values, errors, touched, isValid, dirty, setFieldValue }) => (
        <Form>
          {/* Fecha y hora */}
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
              >
                {docentes.map((docente) => (
                  <MenuItem key={docente} value={docente}>
                    <Checkbox
                      checked={values.docentes.includes(docente)}
                      onChange={(e) => {
                        const docentesSelected = [...values.docentes];
                        if (e.target.checked) {
                          docentesSelected.push(docente);
                          handleSeleccionDocente(docente, true); // Aumentar el peso si se selecciona un docente
                        } else {
                          const index = docentesSelected.indexOf(docente);
                          if (index > -1) {
                            docentesSelected.splice(index, 1);
                            handleSeleccionDocente(docente, false); // Disminuir el peso si se deselecciona un docente
                          }
                        }
                        setFieldValue('docentes', docentesSelected);
                      }}
                    />
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
                  handleSeleccionTipoReserva(e.target.value);
                  setFieldValue('tipoReserva', e.target.value);
                }}
              >
                {tiposReserva.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Field>
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
          {/* Aquí puedes mostrar la fecha y hora de registro */}
          {fechaRegistro && (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              Fecha y hora de registro: {fechaRegistro.toLocaleString('es-ES')}
            </Typography>
          )}
          {/* Aquí puedes mostrar el peso total */}
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Peso total: {pesoTotal}
          </Typography>
        </Form>
      )}
    </Formik>
  );
}

export default SolicitarAmbienteForm;
