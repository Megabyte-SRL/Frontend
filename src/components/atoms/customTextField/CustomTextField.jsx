import React from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';

const CustomTextField = ({
  name = '',
  label = '',
  type = 'text',
  placeholder = '',
  touched = {},
  errors = {},
<<<<<<< HEAD
  mb = 0, // Añadir la propiedad mb para margen inferior
=======
  mb = 0,
>>>>>>> 943e5bd30cbf61aa8eb8e9c3d9e83d96cd6d785d
  required = false,
}) => {
  return (
    <Field
      as={TextField}
      name={name}
      type={type}
      label={ required ? (
        <>
          {label}
          <span style={{ color: 'red', marginLeft: 2 }}>*</span>
        </>
      ) : label}
      placeholder={placeholder}
      helperText={touched[name] ? errors[name] : ''}
      error={touched[name] && Boolean(errors[name])}
      fullWidth
<<<<<<< HEAD
      sx={{ mb: mb }} // Aplicar margen inferior personalizado
=======
      sx={{ mb: mb }}
>>>>>>> 943e5bd30cbf61aa8eb8e9c3d9e83d96cd6d785d
    />
  );
}

export default CustomTextField;
