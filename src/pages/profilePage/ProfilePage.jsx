import React from 'react'

import { Formik, Form } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import * as Yup from 'yup'; 

import CustomFormCard from '../../components/molecules/customFormCard/CustomFormCard';
import CustomTextField from '../../components/atoms/customTextField/CustomTextField';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';

const customStyles = {
  minHeight: '100vh',
  padding: 4,
};

const ProfilePage = () => {
  const { openSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    nombre: Yup.string().min(3, "Minimo 3 caracteres").max(50, "Máximo 50 caracteres").matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras"),
    apellido: Yup.string().min(3, "Minimo 3 caracteres").max(50, "Máximo 50 caracteres").matches(/^[a-zA-Z\s]+$/, "El apellido solo puede contener letras"),
    email: Yup.string().email("Formato de correo invalido").matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Correo electrónico inválido"),
    password: Yup.string().min(8, "Minimo 8 caracteres").max(25, "Máximo 25 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'La contraseña debe coincidir')
  });

  return (
    <CustomFormCard titulo='Perfil' styles={customStyles}>
      <Formik
        initialValues={{
          nombre: 'Lizeth Shirley',
          apellido: 'Amorraga',
          email: 'liz@gmail.com',
          password: '',
          confirmPassword: '',
          rol: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (formValues, { resetForm }) => {
          fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/usuarios`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nombre: formValues.nombre,
              apellido: formValues.apellido,
              email: formValues.email,
              password: formValues.password,
              rol: formValues.rol
            })
          })
            .then(async response => {
              const data = await response.json();
              console.log('Registrar usuario response: ', data);
              openSnackbar('Usuario creado correctamente', 'success');
              resetForm();
            })
            .catch(async error => {
              openSnackbar('Error al registrar usuario', 'error');
            });
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='nombre'
                  label='Nombre'
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='apellido'
                  label='Apellido'
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='email'
                  type='email'
                  label='Correo'
                  touched={touched}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h7" >
                  Cambiar contraseña
                </Typography>
                </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='password'
                  type='password'
                  label="Contraseña"
                  placeholder='Contraseña'
                  touched={touched}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='confirmPassword'
                  type='password'
                  label="Repetir contraseña"
                  placeholder='Repetir Contraseña'
                  touched={touched}
                  errors={errors}
                />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                <Grid item xs={12} sm={12}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                  >
                    Actualizar cuenta
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CustomFormCard>
  );
};

export default ProfilePage;
