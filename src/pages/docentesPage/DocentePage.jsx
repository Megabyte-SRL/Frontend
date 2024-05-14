import React, { useEffect } from 'react'
import ReservaLayout from '../../reservas/layout/ReservaLayout'
import { Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const DocentePage = () => {

  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(auth.rol);
    if(auth.rol != 'docente'){
      auth.logout();
      navigate('/login')
    }
  },[])
  return (
    
    <ReservaLayout>
      <Outlet/>
    </ReservaLayout>
  )
}

export default DocentePage
