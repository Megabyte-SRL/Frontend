import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ReservaPage from '../pages/ReservaPage'
import CrearHorario from '../layout/CrearHorario'
import NuevoAmbiente from '../layout/NuevoAmbiente'
import EliminarAmbientePage from '../pages/EliminarAmbientePage'
import CSVUploader from '../pages/CSVUploader'
<<<<<<< HEAD
import ReservaDocente from '../pages/ReservaDocente'

=======
import HabilitarFechaPage from '../pages/HabilitarFechaPage'
import { Visualizacion } from '../pages/Visualizacion'
import ReservaDocente from '../pages/ReservaDocente'
>>>>>>> 12484f46999fbfb3b50699e8da6fd15df1a1b311

const ReservaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ReservaPage />} />
        <Route path="/crear-horario" element={<CrearHorario />} />
        <Route path="/nuevo-ambiente" element={<NuevoAmbiente />} />
        <Route path="/eliminar-ambiente" element={<EliminarAmbientePage />} />
        <Route path="/carga-masiva" element={<CSVUploader />} />
<<<<<<< HEAD
=======
        <Route path="/visualizar-horario" element={<HabilitarFechaPage />} />
        <Route path="/visualizar" element={<Visualizacion />} />
>>>>>>> 12484f46999fbfb3b50699e8da6fd15df1a1b311
        <Route path="/reservaD" element={<ReservaDocente />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default ReservaRoutes;
