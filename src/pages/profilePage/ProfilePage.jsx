import React, { useEffect, useState } from 'react'

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
  const rol = sessionStorage.getItem('rol');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchInformacionUsuario = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/informacionUsuario`, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
        });

        if (!response.ok) throw new Error('Error al obtener la información del usuario');
        const { data } = await response.json();
        setUsuario(data);
      } catch (error) {
        openSnackbar('Error al obtener la información del usuario', 'error');
      }
    };

    fetchInformacionUsuario();
  }, [openSnackbar]);

  const getValidationSchema = (role) => {
    const baseSchema = {
      email: Yup.string().email("Formato de correo invalido").matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Correo electrónico inválido").required('Correo es requerido'),
      password: Yup.string().min(8, "Minimo 8 caracteres").max(25, "Máximo 25 caracteres").required('Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'La contraseña debe coincidir')
        .required('Repetir contraseña es requerida') 
    };

    if (role !== 'admin') {
      return Yup.object({
        ...baseSchema,
        nombre: Yup.string().min(3, "Minimo 3 caracteres").max(50, "Máximo 50 caracteres").matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras").required('Nombre es requerido'),
        apellido: Yup.string().min(3, "Minimo 3 caracteres").max(50, "Máximo 50 caracteres").matches(/^[a-zA-Z\s]+$/, "El apellido solo puede contener letras").required('Apellido es requerido')
      });
    }

    return Yup.object(baseSchema);
  };

  if (!usuario) {
    return <div>Loading...</div>;
  }

  return (
    <CustomFormCard titulo='Perfil' styles={customStyles}>
      <Formik
        initialValues={{
          nombre: usuario.nombre || '',
          apellido: usuario.apellido || '',
          email: usuario.email || '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={getValidationSchema(rol)}
        onSubmit={async (formValues, { resetForm }) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/actualizarUsuario`, {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formValues)
            });

            if (!response.ok) {
              throw new Error('Error al actualizar el usuario');
            }

            const data = await response.json();
            openSnackbar('Usuario actualizado correctamente', 'success');
            resetForm();
            setUsuario(data);
          } catch (error) {
            openSnackbar(error.message || 'Error al actualizar el usuario', 'error');
          }
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Grid container>
              {rol !== 'admin' && (
                <>
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
                </>
              )}
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
                    disabled={!isValid || !dirty}
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
