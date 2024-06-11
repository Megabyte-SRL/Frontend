import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';

function notificationsLabel(count) {
    if (count === 0) return 'no notifications';
    if (count > 99) return 'more than 99 notifications';
    return `${count} notifications`;
}

const initialNotifications = [
    { id: 1, teacher: 'Ing. Leticia Blanco', message: 'El docente ha aceptado la sugerencia de ambiente 591b', status: 'pending' },
    { id: 2, teacher: 'Ing. Samuel Acha', message: 'El docente ha aceptado la sugerencia de ambiente 617c', status: 'pending' },
    { id: 3, teacher: 'Ing. Benita Cespedes', message: 'El docente ha rechazado la sugerencia de ambiente 691C', status: 'pending' }
];

function getBackgroundColor(status) {
    if (status === 'pending') return '#e3f2fd';
    if (status === 'registrado') return '#e0f2f1';
    if (status === 'rechazado' || status === 'disponible') return '#ffebee';
    return '#ffffff'; // Default background color
}

function Notification({ notification, onAction }) {
    return (
        <MenuItem
            onClick={onAction}
            sx={{ backgroundColor: getBackgroundColor(notification.status), margin: '10px' }}
        >
            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                        {notification.teacher}
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                    {notification.message}
                </Typography>
                {notification.status === 'pending' ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 4, py: 1 }}>
                        <Button variant="contained" color="primary" onClick={() => onAction(notification.id, 'registrado')}>
                            Registrar
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => onAction(notification.id, 'rechazado')} sx={{ marginLeft: '5%' }}>
                            Rechazar
                        </Button>
                    </Box>
                ) : (
                    <Typography color="primary" variant="body2" align="center" sx={{ py: 1 }}>
                        {notification.status === 'registrado' ? 'Registrado' : 'Rechazado'}
                    </Typography>
                )}
            </Box>
        </MenuItem>
    );
}

export default function BadgeNotify() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState(initialNotifications);

    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleAction = (id, action) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id ? { ...notification, status: action } : notification
            )
        );
    };

    const pendingNotificationsCount = notifications.filter(notification => notification.status === 'pending').length;

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
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        notification={notification}
                        onAction={(id, action) => {
                            handleAction(id, action);
                            handleClose();
                        }}
                    />
                ))}
            </Menu>
        </div>
    );
}
