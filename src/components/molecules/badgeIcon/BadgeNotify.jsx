import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { useSnackbar } from '../../../reservas/organisms/snackbarProvider/SnackbarProvider';
import AdminNotification from '../adminNotification/AdminNotification';
import { MenuItem } from '@mui/material';

const notificationsLabel = (count) => {
  if (count === 0) return 'No notificaciones';
  if (count > 99) return 'Más de 99 notificaciones';
  return `${count} notificaciones`;
};

const fetchNotificacionesAceptadas = async (params) => {
  params.estado = 'aceptado';
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/solicitudesAmbientes?${query}`, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de notificaciones');
  const data = await response.json();
  return data.data;
};

const BadgeNotify = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { openSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const data = await fetchNotificacionesAceptadas({});
        setNotifications(data);
      } catch (error) {
        openSnackbar('Error al obtener notificaciones', 'error');
      }
    };

    fetchNotificaciones();
  }, [openSnackbar]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAction = (id, action) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, estado: action } : notification
      )
    );
  };

  const pendingNotificationsCount = notifications.filter(notification => notification.estado === 'aceptado').length;

  return (
    <div>
      <IconButton
        aria-label={notificationsLabel(pendingNotificationsCount)}
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={pendingNotificationsCount} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {notifications.length === 0 ? (
          <MenuItem>No notificaciones</MenuItem>
        ) :(
          notifications.map((notification) => (
            <AdminNotification
              key={notification.id}
              notification={notification}
              onAction={(id, action) => {
                handleAction(id, action);
                handleClose();
              }}
            />
          ))
        )}
      </Menu>
    </div>
  );
};

export default BadgeNotify;
