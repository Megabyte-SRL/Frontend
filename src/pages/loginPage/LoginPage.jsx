import React from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";

import CustomFormCard from '../../components/molecules/customFormCard/CustomFormCard';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  minHeight: '100vh',
  backgroundColor: 'primary.main', 
  padding: 4
};

const LoginPage = () => {
  const { openSnackbar } = useSnackbar();
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },

    validationSchema: Yup.object({
      email:Yup.string().email("Correo inválido").required("Campo requerido"),
      password:Yup.string().required("Campo requerido").min(8,"Minimo 8 caracteres")
    }),
    validateOnChange:false,

    onSubmit: async (formValue, { resetForm }) => {
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
        })
    }
  })

  console.log(formik.errors);

  return (
    <CustomFormCard titulo='Login' styles={customStyles}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name='email'
              label="Correo"
              type='email'
              placeholder='correo@gmail.com'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email}
              helperText={formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name='password'
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              helperText={formik.errors.password}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} sm={12}>
              <Button type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </CustomFormCard>
  );
}

export default LoginPage;
