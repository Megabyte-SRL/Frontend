import React from 'react';

import { Formik, Form, Field } from 'formik';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import * as Yup from 'yup'; 

import CustomFormCard from '../../components/molecules/customFormCard/CustomFormCard';
import CustomTextField from '../../components/atoms/customTextField/CustomTextField';

const customStyles = {
  minHeight: '100vh',
  padding: 4,
};

const SignUpPage = () => {

  const rolesUsuarioOptions = ['admin', 'docente'];
  const validationSchema = Yup.object({
    nombre: Yup.string().required("Campo requerido").min(3, "Minimo 3 caracteres"),
    apellido: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Formato de correo invalido").required("Campo requerido"),
    password: Yup.string().required("Campo requerido").min(8, "Minimo 8 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'La contraseña debe coincidir')
      .required("Campo requirido"),
    rol: Yup.string().required("Campo Requerido")
  });

  return (
    <CustomFormCard titulo='Crear usuario' styles={customStyles}>
      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          email: '',
          password: '',
          confirmPassword: '',
          rol: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Form values:');
          console.log(values);
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='nombre'
                  label='Nombre'
                  placeholder='Nombre'
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='apellido'
                  //helperText={touched.apellido ? errors.apellido : ''}
                  //error={touched.apellido && Boolean(errors.apellido)}
                  label='Apellido'
                  placeholder='Apellido'
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='email'
                  type='email'
                  label='Correo'
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

              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTextField
                  name='repeatPassword'
                  type='password'
                  label="Repetir contraseña"
                  placeholder='Repetir Contraseña'
                  touched={touched}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Field as={Select} name='rol' label='Rol'>
                    {rolesUsuarioOptions.map(rol => (
                      <MenuItem key={rol} value={rol}>{rol}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
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
                    Crear cuenta
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

export default SignUpPage;
