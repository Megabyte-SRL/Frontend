import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ReservaPage from '../pages/ReservaPage'

const ReservaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ReservaPage/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  )
}

export default ReservaRoutes
