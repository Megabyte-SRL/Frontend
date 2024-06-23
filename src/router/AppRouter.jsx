import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage'
import SignUpPage from '../pages/signUpPage/SignUpPage'
import ReservaPage from '../reservas/pages/ReservaPage'
import NuevoAmbiente from '../reservas/layout/NuevoAmbiente'
import AmbientesPage from '../pages/ambientesPage/AmbientesPage'
import SolicitudesPage from '../pages/solicitudesPage/SolicitudesPage';
import { Visualizacion } from '../reservas/pages/Visualizacion'
import ReservaDocente from '../reservas/pages/ReservaDocente'
import RequireAuth from './RequireAuth'
import CargaMasivaPage from '../pages/cargaMasivaPage/CargaMasivaPage'
import CargaMasivaDocentePage from '../pages/cargaMasivaDocentesPage/CargaMasivaDocentePage'
import VerficarSolicitudesPage from '../pages/verificarSolicitudesPage/VerficarSolicitudesPage'
import ProfilePage from '../pages/profilePage/ProfilePage'
import AprobarSolicitudesPage from '../pages/aprobarSolicitudesPage/AprobarSolicitudesPage'
import SugerirAmbientesPage from '../pages/sugerirAmbientesPage/SugerirAmbientesPage'
import NotificacionesSugerenciasPage from '../pages/notificacionesSugerenciasPage/NotificacionesSugerenciasPage'
import RegistroSolicitudesPage from '../pages/registroSolicitudesPage/RegistroSolicitudesPage'

const AppRouter = () => {
  return (
    <Routes>
      {/*rutas para el login */}
      <Route path='/login' element={<LoginPage />} />

      {/* rutas para la reserva */}
      <Route
        path='/dashboard'
        element={<RequireAuth><ReservaPage /></RequireAuth>}
      >
        <Route path='nuevo-ambiente' element={<NuevoAmbiente />} />
        <Route path='carga-masiva' element={<CargaMasivaPage />} />
        <Route path='ambientes' element={<AmbientesPage />} />
        <Route path='solicitudes' element={<SolicitudesPage />} />
        <Route path="visualizar" element={<Visualizacion />} />
        <Route path="reservaD" element={<ReservaDocente />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='carga-masiva-docentes' element={<CargaMasivaDocentePage />} />
        <Route path='verificar-solicitudes' element={<VerficarSolicitudesPage />} />
        <Route path='aprobar-solicitudes' element={<AprobarSolicitudesPage />} />
        <Route path='profile' element={<ProfilePage/>} />
        <Route path='sugerir-ambientes' element={<SugerirAmbientesPage/>}/>
        <Route path='notificaciones-sugerencias' element={<NotificacionesSugerenciasPage />} />
        <Route path='registro-solicitudes' element={<RegistroSolicitudesPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to='/login' replace />}
      />
    </Routes>
  )
}

export default AppRouter;
