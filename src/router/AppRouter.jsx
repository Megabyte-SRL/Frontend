import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReservaRoutes from '../reservas/routes/ReservaRoutes'
import AuthRoutes from '../loginAuth/routes/AuthRoutes'

const AppRouter = () => {
  return (
    <Routes>
        {/*rutas para el login */}
        <Route path='/auth/*' element={<AuthRoutes/>}/>

        {/* rutas para la reserva */}
        <Route path='/*' element={<ReservaRoutes/>}/>


    </Routes>
  )
}

export default AppRouter
