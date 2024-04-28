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
    />
  );
}

export default CustomTextField;
