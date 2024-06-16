import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: sessionStorage.getItem('token'),
    rol: sessionStorage.getItem('rol'),
    nombre: sessionStorage.getItem('nombre'),
    isAuthenticated: !!sessionStorage.getItem('token')
  });

  const login = (token, rol, nombre) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('rol', rol);
    sessionStorage.setItem('nombre', nombre);
    setAuth({ token, rol, nombre, isAuthenticated: true });
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('nombre');
    setAuth({ token: null, rol: null, nombre: null, isAuthenticated: false });
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);