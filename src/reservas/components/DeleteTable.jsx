import { Add as AddIcon } from '@mui/icons-material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, Button } from '@mui/material'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'


export const DeleteTable = ({ datos }) => {
    const [modalData, setModalData] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)
    const [selectedRowIndex, setSelectedRowIndex] = useState(null)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleClick = (index) => {
        setSelectedButtonIndex(index)
        setModalData(datos[index])
        setSelectedRowIndex(index)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedButtonIndex(null)
        setSelectedRowIndex(null)
        setSnackbarMessage('Acción deshecha')
    }

    const handleAceptar = () => {
        setOpenModal(false)
        setSelectedButtonIndex(null)
        setSelectedRowIndex(null)

        setSnackbarMessage('Ambiente Borrado')
        setSnackbarOpen(true)
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
                        <TableCell>Fecha</TableCell>
                        <TableCell>Nombre Ambiente</TableCell>
                        <TableCell>Capacidad</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datos.map((fila, index) => (
                        <TableRow
                            key={index}
                            sx={{ bgcolor: selectedRowIndex === index ? '#F2F2F2' : 'inherit' }}
                        >
                            <TableCell>{fila.fecha}</TableCell>
                            <TableCell>{fila.nombreAmbiente}</TableCell>
                            <TableCell>{fila.capacidad}</TableCell>
                            <TableCell>{fila.descripcion}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    aria-label="Agregar"
                                    sx={{
                                        backgroundColor: selectedButtonIndex === index ? '#176BC6' : '#545454',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: selectedButtonIndex === index ? '#176BC6' : '#545454',
                                        },
                                    }}
                                    onClick={() => handleClick(index)}
                                >
                                    <AddIcon />
                                </IconButton>
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
                        width: '30%',
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
                    <Button
                        variant="contained"
                        sx={{
                            ml: 3,
                            marginRight: '40%',
                            marginTop: '4%',
                            fontSize: '120%'
                        }}
                        onClick={handleAceptar}>
                        Aceptar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            fontSize: '120%',
                            color: '#176BC6',
                            border: '1px solid #176BC6',
                            bgcolor: 'white',
                        }}
                        onClick={handleCloseModal}>
                        Cancelar
                    </Button>
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
