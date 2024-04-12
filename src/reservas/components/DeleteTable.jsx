import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, Button, Grid } from '@mui/material'
import { useState } from 'react'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteTable = ({ data }) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)
    const [selectedRowIndex, setSelectedRowIndex] = useState(null)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleEliminar = (id) => {
        fetch(`http://localhost:8080/api/ambientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el ambiente');
                }
                setSnackbarMessage(`${data.msg || 'Ambiente Borrado'}`);
                setSnackbarOpen(true)
            })
            .catch(error => {
                console.error('Error al eliminar el ambiente:', error);
                setSnackbarMessage(`${data.msg || 'Ocurrió un error'}`);
                setSnackbarOpen(true)
            })
            .finally(() => {
                setOpenModal(false)
                setSelectedRowIndex(null)
            });
    }

    const handleClick = (index) => {
        setSelectedButtonIndex(index)
        setSelectedRowIndex(index)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedButtonIndex(null)
        setSelectedRowIndex(null)
        setSnackbarMessage('Acción deshecha')
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return
        setSnackbarOpen(false)
    }

    return (
        <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre Ambiente</TableCell>
                        <TableCell>Capacidad</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell align="center">Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((fila, index) => (
                        <TableRow
                            key={index}
                            sx={{ bgcolor: selectedRowIndex === index ? '#F2F2F2' : 'inherit' }}
                        >
                            <TableCell>{fila.nombre}</TableCell>
                            <TableCell>{fila.capacidad}</TableCell>
                            <TableCell>{fila.descripcion}</TableCell>
                            <TableCell align="center">
                                <DeleteIcon
                                    aria-label="Agregar"
                                    fontSize="large"
                                    sx={{
                                        color: '#0073E6',
                                        '&:hover': {
                                            color: selectedButtonIndex === index ? '#176BC6' : '#545454',
                                        },
                                    }}
                                    onClick={() => handleClick(index)}
                                >
                                </DeleteIcon>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        px: 4,
                        py: 5
                    }}
                >
                    <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                        Se va a ELIMINAR un ambiente,
                    </Typography>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                        confirme esta accion
                    </Typography>

                    <Grid spacing={5} align='center'>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: '120%',
                                marginX: '10%',
                                marginY: '4%',
                            }}
                            onClick={() => handleEliminar(data[selectedRowIndex].id)}>
                            Aceptar
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                fontSize: '120%',
                                marginX: '10%',
                                marginY: '4%',
                            }}
                            onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Grid>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '25rem',
                    }}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </TableContainer>
    )
}
