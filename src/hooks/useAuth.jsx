import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: sessionStorage.getItem('token'),
    rol: sessionStorage.getItem('rol'),
    isAuthenticated: !!sessionStorage.getItem('token')
  });

  const login = (token, rol) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('rol', rol);
    setAuth({ token, rol, isAuthenticated: true });
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol');
    setAuth({ token: null, rol: null, isAuthenticated: false });
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);