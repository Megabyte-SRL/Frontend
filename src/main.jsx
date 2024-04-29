import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from './reservas/organisms/snackbarProvider/SnackbarProvider.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
