import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";

import CustomFormCard from '../../components/molecules/customFormCard/CustomFormCard';

const customStyles = {
  minHeight: '100vh',
  backgroundColor: 'primary.main', 
  padding: 4
};

const LoginPage = () => {

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

    onSubmit:(formValue) =>{
      console.log("registro OK");
      console.log(formValue);
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
              //type='email'
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
