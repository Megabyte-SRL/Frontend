import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ReservaPage from '../pages/ReservaPage'
import CrearHorario from '../layout/CrearHorario'

const ReservaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ReservaPage />} />
        <Route path="/crear-horario" element={<CrearHorario />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default ReservaRoutes
