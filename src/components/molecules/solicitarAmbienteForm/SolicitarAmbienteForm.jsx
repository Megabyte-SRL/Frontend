import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

import CustomTextField from '../../atoms/customTextField/CustomTextField';

const SolicitarAmbienteForm = ({
  row = {},
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const tiposReserva = ['Emergencia', 'Examen Mesa', 'Parcial', 'Clases normal'];

  const [materias, setMaterias] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [loadingDocentes, setLoadingDocentes] = useState(false);

  useEffect(() => {
    obtenerListaMateriasGrupos();
  }, []);

  const obtenerListaMateriasGrupos = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/materiasGrupos`, {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de horarios disponibles');
        }
        return response.json();
      })
      .then(({ data }) => {
        setMaterias(data);
      })
      .catch(({ msg }) => {
        console.error(msg);
      });
  };

  const handleMateriaChange = async (event, setFieldValue) => {
    const selectedValue = event.target.value;
    const [materiaId, ] = selectedValue.split('-'); 

    setFieldValue('grupo', selectedValue);
    setFieldValue('docentes', []);
  
    setLoadingDocentes(true);

    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/docentesMateria/${materiaId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de docentes');
        }
        return response.json();
      })
      .then(({ data }) => {
        setDocentes(data);
        setLoadingDocentes(false);
      })
      .catch(({ msg }) => {
        console.error(msg);
        setLoadingDocentes(false);
      });
  };

  const obtenerDocenteNombreById = (id) => {
    const docenteFound = docentes.find(docente => docente.id === id);
    return docenteFound ? `${docenteFound.nombre} ${docenteFound.apellido}` : id;
  };

  const validationSchema = Yup.object({
    grupo: Yup.string().required('La materia es requerida'),
    capacidad: Yup.number().required('La capacidad es requerida'),
    tipoReserva: Yup.string().required('El tipo de reserva es requerido'),
  });

  return (
    <Formik
        initialValues={{
          grupo: '',
          capacidad: 0,
          tipoReserva: '',
          docentes: []
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (values.capacidad === 0) {
            // Si la capacidad es 0, no enviar el formulario y mostrar un mensaje de error
            alert('La capacidad no puede ser 0');
            return;
          }

          // Si la capacidad no es 0, enviar el formulario
          onSubmit({ ...values, id: row.id });
          resetForm();
          setSubmitting(false);
        }}
      >
      {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
        <Form>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Materia Grupo<span style={{ color: 'red', marginLeft: 2 }}>*</span></InputLabel>
                <Field
                  as={Select}
                  name='grupo'
                  label='Materia Grupo*'
                  value={values.grupo}
                  onChange={(event) => handleMateriaChange(event, setFieldValue)}
                >
                  {materias.length === 0 ? (
                    <MenuItem disabled>Cargando materias...</MenuItem>
                  ) : (
                    materias.map(materia => (
                      <MenuItem
                        key={`${materia.grupoId}-${materia.grupo}`}
                        value={`${materia.materiaId}-${materia.grupoId}`}
                      >
                        {materia.materia} - {materia.grupo}
                      </MenuItem>
                    ))
                  )}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CustomTextField
                name='capacidad'
                type='number'
                label='Capacidad'
                placeholder='Capacidad'
                touched={touched}
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de reserva</InputLabel>
                <Field
                  as={Select}
                  name='tipoReserva'
                  label='Tipo de reserva'
                >
                  {tiposReserva.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Docentes combinados</InputLabel>
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
        </Form>
      )}
    </Formik>
  );
}

export default SolicitarAmbienteForm;