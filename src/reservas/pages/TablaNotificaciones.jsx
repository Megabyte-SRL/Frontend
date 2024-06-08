//src/reservas/pages/TablaNotificaciones.jsx

import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FlagIcon from '@mui/icons-material/Flag';

const data = [
    { id: 1, ambiente: 'Aula 1', fecha: '2023-06-01', horario: '08:00 - 10:00', capacidad: 30 },
    { id: 2, ambiente: 'Aula 2', fecha: '2023-06-02', horario: '10:00 - 12:00', capacidad: 25 },
    { id: 3, ambiente: 'Aula 3', fecha: '2023-06-03', horario: '12:00 - 14:00', capacidad: 20 },
    { id: 4, ambiente: 'Aula 4', fecha: '2023-06-04', horario: '14:00 - 16:00', capacidad: 35 },
    { id: 5, ambiente: 'Aula 5', fecha: '2023-06-05', horario: '16:00 - 18:00', capacidad: 40 },
    { id: 6, ambiente: 'Aula 6', fecha: '2023-06-06', horario: '08:00 - 10:00', capacidad: 30 },
    { id: 7, ambiente: 'Aula 7', fecha: '2023-06-07', horario: '10:00 - 12:00', capacidad: 25 },
    { id: 8, ambiente: 'Aula 8', fecha: '2023-06-08', horario: '12:00 - 14:00', capacidad: 20 },
    { id: 9, ambiente: 'Aula 9', fecha: '2023-06-09', horario: '14:00 - 16:00', capacidad: 35 },
    { id: 10, ambiente: 'Aula 10', fecha: '2023-06-10', horario: '16:00 - 18:00', capacidad: 40 },
    { id: 11, ambiente: 'Aula 11', fecha: '2023-06-11', horario: '08:00 - 10:00', capacidad: 30 },
    { id: 12, ambiente: 'Aula 12', fecha: '2023-06-12', horario: '10:00 - 12:00', capacidad: 25 },
];

const TablaNotificaciones = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [completedActions, setCompletedActions] = useState({});

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpen = (action, id) => {
        setSelectedAction({ action, id });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        const confirmation = selectedAction.action === 'ok' ? 1 : 0;
        const jsonResponse = JSON.stringify({ confirmation });
        console.log('JSON Response:', jsonResponse);
        // Aquí puedes enviar el JSON a tu servidor
        setCompletedActions((prev) => ({
            ...prev,
            [selectedAction.id]: selectedAction.action
        }));
        handleClose();
    };

    return (
        <>
            <Paper>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ambiente</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Horario</TableCell>
                                <TableCell>Capacidad</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.ambiente}</TableCell>
                                    <TableCell>{row.fecha}</TableCell>
                                    <TableCell>{row.horario}</TableCell>
                                    <TableCell>{row.capacidad}</TableCell>
                                    <TableCell>
                                        {completedActions[row.id] ? (
                                            <FlagIcon color={completedActions[row.id] === 'ok' ? "primary" : "error"} />
                                        ) : (
                                            <>
                                                <IconButton color="success" onClick={() => handleOpen('ok', row.id)}>
                                                    <CheckCircleIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleOpen('cancel', row.id)}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmación de Acción"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {selectedAction?.action === 'ok' ? '¿Estás seguro de que deseas confirmar esta acción?' : '¿Estás seguro de que deseas cancelar esta acción?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TablaNotificaciones;
