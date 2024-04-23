import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, InputAdornment, IconButton, Checkbox, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ReservaLayout from '../layout/ReservaLayout';

const ReservaDocente = () => {
    const [datos, setDatos] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
        try {
            const respuesta = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/ambientes`);
            if (!respuesta.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await respuesta.json();
            setDatos(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const handleCheckboxChange = (index) => () => {
        // Manejar el cambio de estado del checkbox para la fila dada
        const newSelectedRows = [...selectedRows];
        if (newSelectedRows.includes(index)) {
            // Si el índice ya está seleccionado, lo eliminamos
            newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
        } else {
            // Si el índice no está seleccionado, lo agregamos
            newSelectedRows.push(index);
        }
        setSelectedRows(newSelectedRows);
    };

    return (
        <ReservaLayout>
            <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2rem', marginBottom: '.15rem' }}>
                    <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Fecha:</Typography>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Ambiente:</Typography>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Capacidad:</Typography>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Estado:</Typography>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'blue', // Color de fondo azul
                            color: 'white', // Color del texto en blanco para contraste
                            padding: '1% 5%', // Padding interno del botón
                            borderRadius: '8px', // Borde redondeado para una apariencia más suave
                            marginRight: '1rem',
                            marginLeft: '5%',
                            '&:hover': {
                                backgroundColor: 'darkblue', // Color de fondo más oscuro en el estado de hover
                            },
                            '&:focus': {
                                boxShadow: '0 0 0 3px rgba(0, 0, 255, 0.5)', // Sombra azul alrededor del botón cuando se enfoca
                            },
                            '&:active': {
                                backgroundColor: 'navy', // Color de fondo más oscuro cuando el botón está activo
                            },
                        }}
                    >
                        Reservar
                    </Button>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Ambiente</TableCell>
                            <TableCell>Capacidad</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Seleccionar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(datos) && datos.map((fila, index) => (
                            <TableRow key={index}>
                                <TableCell>{fila.fecha}</TableCell>
                                <TableCell>{fila.nombre}</TableCell>
                                <TableCell>{fila.capacidad}</TableCell>
                                <TableCell>{fila.estado}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(index)}
                                        onChange={handleCheckboxChange(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ReservaLayout>
    );
};

export default ReservaDocente;
