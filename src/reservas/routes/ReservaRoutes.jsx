import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ReservaPage from '../pages/ReservaPage'
import CrearHorario from '../layout/CrearHorario'
import NuevoAmbiente from '../layout/NuevoAmbiente'
import EliminarAmbientePage from '../pages/EliminarAmbientePage'
import CSVUploader from '../pages/CSVUploader'
import ReservaDocente from '../pages/ReservaDocente'


const ReservaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ReservaPage />} />
        <Route path="/crear-horario" element={<CrearHorario />} />
        <Route path="/nuevo-ambiente" element={<NuevoAmbiente />} />
        <Route path="/eliminar-ambiente" element={<EliminarAmbientePage />} />
        <Route path="/carga-masiva" element={<CSVUploader />} />
        <Route path="/reservaD" element={<ReservaDocente />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default ReservaRoutes
