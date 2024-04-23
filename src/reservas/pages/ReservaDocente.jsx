import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, InputAdornment, IconButton, Checkbox, Button,List, ListItem, ListItemText  } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ReservaLayout from '../layout/ReservaLayout';

const ReservaDocente = () => {
    const [datos, setDatos] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedHoras, setSelectedHoras] = useState([]); // Estado para almacenar las horas seleccionadas
    const [listOpen, setListOpen] = useState(false);

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

    const handleCheckboxChange = (hora) => () => {
        if (selectedHoras.includes(hora)) {
          setSelectedHoras(selectedHoras.filter((h) => h !== hora));
        } else {
          setSelectedHoras([...selectedHoras, hora]);
        }
        setHorasError(false); // Actualizar el estado de error a false al cambiar las horas seleccionadas
      };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
        setFechaError(false); // Actualizar el estado de error a false al cambiar la fecha
      };

    const handleSelectAll = () => {
    if (selectedHoras.length === 10) {
        setSelectedHoras([]);
    } else {
        setSelectedHoras(['6:45 - 8:15', '8:15 - 9:45', '9:45 - 11:15', '11:15 - 12:45', '12:45 - 14:15', '14:15 - 15:45', '15:45 - 17:15', '17:15 - 18:45', '18:45 - 20:15', '20:15 - 21:45']);
    }
    };
   
    const toggleList = () => {
        setListOpen((prevState) => !prevState);
    };
    return (
        <ReservaLayout>
            <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '3rem', // Reduce el margen superior
                marginBottom: '0.5rem', // Reduce el margen inferior
                maxWidth: '88%', // Ajusta el ancho máximo del Box
                gap: '.5rem', // Espacio entre elementos
            }}>
                <Typography variant="body1">Fecha:</Typography>
                <TextField
                    id="fecha"
                    type="date"
                    onChange={handleFechaChange}
                    InputProps={{
                        inputProps: { locale: 'es' },
                    }}
                    sx={{ width: '30%' }} // Ajusta el ancho a un valor más pequeño
                />
                <Typography variant="body1">Horarios:</Typography>
                <Button
                    variant="outlined"
                    sx={{ width: '30%', height: '2.5rem' }} // Ajusta el ancho y altura del botón
                    onClick={toggleList}
                >
                    Lista{listOpen}
                </Button>
                {listOpen && (
                    <List>
                        <ListItem dense button onClick={handleSelectAll}>
                            <ListItemText primary="Seleccionar todo" />
                            <Checkbox checked={selectedHoras.length === 10} />
                        </ListItem>
                        {['6:45 - 8:15', '8:15 - 9:45', '9:45 - 11:15', '11:15 - 12:45', '12:45 - 14:15', '14:15 - 15:45', '15:45 - 17:15', '17:15 - 18:45', '18:45 - 20:15', '20:15 - 21:45'].map((hora, index) => (
                            <ListItem key={index} dense button onClick={handleCheckboxChange(hora)}>
                                <ListItemText primary={hora} />
                                <Checkbox checked={selectedHoras.includes(hora)} />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Typography variant="body1">Ambiente:</Typography>
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
                    sx={{ width: '30%' }} // Ajusta el ancho a un valor más pequeño
                />
                <Typography variant="body1">Capacidad:</Typography>
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
                    sx={{ width: '30%' }} // Ajusta el ancho a un valor más pequeño
                />
                <Typography variant="body1">Estado:</Typography>
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
                    sx={{ width: '30%' }} // Ajusta el ancho a un valor más pequeño
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '0.5rem 2rem', // Ajusta el padding del botón
                        borderRadius: '8px',
                        marginRight: '1rem',
                        marginLeft: '2%',
                        '&:hover': {
                            backgroundColor: 'darkblue',
                        },
                        '&:focus': {
                            boxShadow: '0 0 0 3px rgba(0, 0, 255, 0.5)',
                        },
                        '&:active': {
                            backgroundColor: 'navy',
                        },
                    }}
                >
                    Reservar
                </Button>
            </Box>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Horario</TableCell>
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
                                <TableCell>{fila.horario}</TableCell>
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
