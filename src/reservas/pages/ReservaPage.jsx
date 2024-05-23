import React, { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import ReservaLayout from '../layout/ReservaLayout';
import { useAuth } from '../../hooks/useAuth';

const ReservaPage = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth.rol !='admin'){
      auth.logout();
      navigate('/login')
    }
  },[])

  return (
    <ReservaLayout>
      <Outlet />
    </ReservaLayout>
  )
}

export default ReservaPage;
