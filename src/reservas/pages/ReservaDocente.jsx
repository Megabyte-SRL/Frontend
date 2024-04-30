import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField,
  InputAdornment, IconButton, Checkbox, Button, List, ListItem, ListItemText, Dialog, DialogTitle,
  DialogContent, DialogActions, Select, MenuItem
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ReservaLayout from '../layout/ReservaLayout';
import { Popover } from '@mui/material';


const ReservaDocente = () => {
    const [datos, setDatos] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedHoras, setSelectedHoras] = useState([]);
    const [listOpen, setListOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
    const [tipoExamen, setTipoExamen] = useState(''); // Estado para almacenar el tipo de examen seleccionado
    const [anchorEl, setAnchorEl] = useState(null);
    const [capacidadFiltro, setCapacidadFiltro] = useState('');
    const [ambienteFiltro, setAmbienteFiltro] = useState('');


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
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
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

    const handleModalOpen = () => {
        setModalOpen(true);
        
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleChange = (event) => {
        setTipoExamen(event.target.value);
    };

    const handleListClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleListClose = () => {
        setAnchorEl(null);
    };

    const handleCapacidadChange = (event) => {
        setCapacidadFiltro(event.target.value);
    };
    
    const filtrarDatosPorCapacidad = () => {
        if (!capacidadFiltro) {
            return datos;
        }
    
        // Convertir la capacidad y capacidadFiltro a cadenas para comparar los valores
        const capacidadFiltroStr = capacidadFiltro.toString();
    
        return datos.filter((dato) => {
            const capacidadStr = dato.capacidad.toString();
            // Filtrar datos cuya capacidad comience con capacidadFiltro
            return capacidadStr.startsWith(capacidadFiltroStr);
        });
    };

    const handleAmbienteChange = (event) => {
        setAmbienteFiltro(event.target.value);
    };

    const filtrarDatosPorAmbiente = () => {
        if (!ambienteFiltro) {
            return datos;
        }
    
        // Convertir los valores a cadenas y filtrar datos por ambiente
        const ambienteFiltroStr = ambienteFiltro.toLowerCase();
    
        return datos.filter((dato) => {
            const ambienteStr = dato.nombre.toLowerCase();
            return ambienteStr.includes(ambienteFiltroStr);
        });
    };

    const filtrarDatos = () => {
        let datosFiltrados = datos;
    
        if (capacidadFiltro) {
            const capacidadFiltroStr = capacidadFiltro.toString();
            datosFiltrados = datosFiltrados.filter((dato) => dato.capacidad.toString().startsWith(capacidadFiltroStr));
        }
    
        if (ambienteFiltro) {
            const ambienteFiltroStr = ambienteFiltro.toLowerCase();
            datosFiltrados = datosFiltrados.filter((dato) => dato.nombre.toLowerCase().includes(ambienteFiltroStr));
        }
    
        return datosFiltrados;
    };

    return (
        <ReservaLayout>
            <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '3rem',
                marginBottom: '0.5rem',
                maxWidth: '88%',
                gap: '.5rem',
            }}>
                <Typography variant="body1">Fecha:</Typography>
                <TextField
                    id="fecha"
                    type="date"
                    onChange={handleFechaChange}
                    InputProps={{
                        inputProps: { locale: 'es' },
                    }}
                    sx={{ width: '30%' }}
                />
                <Typography variant="body1">Horarios:</Typography>
                <Button
                    variant="outlined"
                    sx={{ width: '30%', height: '2.5rem' }}
                    onClick={handleListClick}
                    aria-describedby="list-popover"
                >
                    Lista
                </Button>
                <Popover
                    id="list-popover"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleListClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
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
                </Popover>
                <Typography variant="body1">Ambiente:</Typography>
                    <TextField
                        id="ambienteFiltro"
                        type="text"
                        value={ambienteFiltro}
                        onChange={handleAmbienteChange}
                        sx={{ width: '30%' }}
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
                 <Typography variant="body1">Capacidad:</Typography>
                    <TextField
                        id="capacidadFiltro"
                        type="number"
                        value={capacidadFiltro}
                        onChange={handleCapacidadChange}
                        sx={{ width: '30%' }}
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
                        onClick={handleModalOpen}
                        sx={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: '0.5rem 2rem',
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
                        SIGUIENTE
                    </Button>
            </Box>

            {/* Modal para el formulario */}
            <Dialog open={modalOpen} onClose={handleModalClose} 
                sx={{ 
                    '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        backgroundColor: '#FEFFFF',
                        color: '#333',
                    }
                    }
                }}>
                <DialogTitle sx={{ textAlign: 'center' }}>SOLICITUD DE AMBIENTE</DialogTitle>
      
                <DialogContent>
                    {/* Agrega los campos del formulario que necesites aquí */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombreAsignatura"
                        label="Nombre de la Asignatura"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="numEstudiantes"
                        label="Numero de estudiantes"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <Select
                      value={tipoExamen}
                      onChange={handleChange}
                      fullWidth
                      variant="standard"
                      displayEmpty
                      id="tipoExamen"
                      label="Tipo de examen"
                    >
                      <MenuItem value="" disabled>
                        Seleccione el tipo de examen
                      </MenuItem>
                      <MenuItem value="examenMesa">Examen de Mesa</MenuItem>
                      <MenuItem value="primerParcial">Primer Parcial</MenuItem>
                      <MenuItem value="segundoParcial">Segundo Parcial</MenuItem>
                      <MenuItem value="examenFinal">Examen Final</MenuItem>
                      <MenuItem value="exSegundaInstancia">Examen de 2da Instancia</MenuItem>
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descSolicitud"
                        label="Descripcion de solicitud"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {/* Agrega más campos si es necesario */}
                </DialogContent>
                <DialogActions>
                <Button variant="text" onClick={handleModalClose} sx={{ color: 'black', border: '1px solid black', borderRadius: '8px' }}>
                CANCELAR
                </Button>
                <Button variant="contained" color="primary" onClick={handleModalClose}>
                ENVIAR
                </Button>
                
                </DialogActions>
            </Dialog>

            <Table>
                <TableHead>
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
                    {filtrarDatos().map((fila, index) => (
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
