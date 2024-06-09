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
  mb = 0,
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
      sx={{ mb: mb }}
    />
  );
}

export default CustomTextField;
