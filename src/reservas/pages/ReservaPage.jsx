import React, { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import ReservaLayout from '../layout/ReservaLayout';
import ModalHabilitarFecha from '../../components/molecules/modalHabilitarFecha/ModalHabilitarFecha';

const ReservaPage = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("rol") === 'admin') {
      fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/checkFecha`, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
      })
      .then(async response => {
        const data = await response.json();
        if (data.msg === 'update' || data.msg === 'empty') {
          setOpenModal(true);
        }
      })
      .catch(error => {
        console.error('Error checking fecha:', error);
      });
    }
  }, []);

  const handleSuccess = () => {
    setOpenModal(false);
  };

  return (
    <ReservaLayout>
      <Outlet />
      <ModalHabilitarFecha open={openModal} onSuccess={handleSuccess} />
    </ReservaLayout>
  )
}

export default ReservaPage;
