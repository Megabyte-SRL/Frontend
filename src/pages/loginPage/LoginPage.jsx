import React from 'react';

import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import CustomFormCard from '../../components/molecules/customFormCard/CustomFormCard';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../components/atoms/customTextField/CustomTextField';

const customStyles = {
  minHeight: '100vh',
  backgroundColor: 'primary.main', 
  padding: 4
};

const LoginPage = () => {
  const { openSnackbar } = useSnackbar();
  const auth = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email:Yup.string().email("Correo inválido").required("Campo requerido"),
    password:Yup.string().required("Campo requerido").min(8,"Minimo 8 caracteres")
  });

  return (
    <CustomFormCard titulo='Login' styles={customStyles}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (formValue, { resetForm }) => {
          fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValue)
          })
            .then(async response => {
              const { data } = await response.json();
              auth.login(data.token, data.rol);
              navigate('/dashboard');
            })
            .catch(error => {
              console.log('error: ', error);
              openSnackbar('Error al iniciar sesión', 'error');
            })
            .finally(() => {
              resetForm();
            });
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='email'
                  type='email'
                  label="Correo"
                  placeholder='correo@gmail.com'
                  touched={touched}
                  errors={errors}
                />
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

              <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12} sm={12}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    disabled={!isValid || !dirty}
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CustomFormCard>
  );
}

export default LoginPage;
