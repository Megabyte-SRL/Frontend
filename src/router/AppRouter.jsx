import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReservaRoutes from '../reservas/routes/ReservaRoutes'

const AppRouter = () => {
  return (
    <Routes>

        {/* ReservaApp */}
        <Route path='/*' element={<ReservaRoutes/>}/>


    </Routes>
  )
}

export default AppRouter
