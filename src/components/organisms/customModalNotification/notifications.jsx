import React, { useState } from 'react';
import NotificationModal from './notificationModal';
export default function Notifications() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    
      <NotificationModal open={modalOpen} onClose={closeModal} />
      
  );
}
