import React from 'react';

import { Outlet } from 'react-router-dom';
import ReservaLayout from '../layout/ReservaLayout';

const ReservaPage = () => {
  return (
    <ReservaLayout>
      <Outlet />
    </ReservaLayout>
  )
}

export default ReservaPage;
