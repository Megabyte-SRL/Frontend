import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [state, setState] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const openSnackbar = (message, severity) => {
    setState({ open: true, message, severity });
  }

  const closeSnackbar = () => {
    setState({ open: false, message: '', severity: 'info' });
  }

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Snackbar
        id='global-snackbar'
        key='global-snackbar'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={state.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={state.severity}
          variant='filled'
        >
          {state.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}
