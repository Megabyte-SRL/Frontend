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
  mb = 0, // Añadir la propiedad mb para margen inferior
}) => {
  return (
    <Field
      as={TextField}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      helperText={touched[name] ? errors[name] : ''}
      error={touched[name] && Boolean(errors[name])}
      fullWidth
      sx={{ mb: mb }} // Aplicar margen inferior personalizado
    />
  );
}

export default CustomTextField;
