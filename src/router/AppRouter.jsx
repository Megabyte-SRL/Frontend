import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage'
import SignUpPage from '../pages/signUpPage/SignUpPage'
import ReservaPage from '../reservas/pages/ReservaPage'
import NuevoAmbiente from '../reservas/layout/NuevoAmbiente'
import CSVUploader from '../reservas/pages/CSVUploader'
import AmbientesPage from '../pages/ambientesPage/AmbientesPage'
import SolicitudesPage from '../pages/solicitudesPage/SolicitudesPage';
import HabilitarFechaPage from '../reservas/pages/HabilitarFechaPage'
import { Visualizacion } from '../reservas/pages/Visualizacion'

const AppRouter = () => {
  return (
    <Routes>
      {/*rutas para el login */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />

      {/* rutas para la reserva */}
      <Route
        path='/dashboard'
        element={<ReservaPage />}
      >
        <Route path='nuevo-ambiente' element={<NuevoAmbiente />} />
        <Route path='carga-masiva' element={<CSVUploader />} />
        <Route path='ambientes' element={<AmbientesPage />} />
        <Route path='solicitudes' element={<SolicitudesPage />} />
        <Route path="visualizar-horario" element={<HabilitarFechaPage />} />
        <Route path="visualizar" element={<Visualizacion />} />
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
      </Route>
      <Route
        path="*"
        element={<Navigate to='/login' replace />}
      />
    </Routes>
  )
}

export default AppRouter
