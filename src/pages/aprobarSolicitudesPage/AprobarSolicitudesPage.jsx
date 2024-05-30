import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, Paper, Modal, Button, Grid, TextField
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useMemo, useEffect } from 'react';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';

const createData = (id, fecha, ambiente, horario, capacidad, estado, prioridad) => ({
    id,
    fecha,
    ambiente,
    horario,
    capacidad,
    estado,
    prioridad,
});

const headCells = [
    { id: 'fecha', numeric: false, disablePadding: true, label: 'Fecha' },
    { id: 'ambiente', numeric: false, disablePadding: false, label: 'Ambiente' },
    { id: 'horario', numeric: false, disablePadding: false, label: 'Horario' },
    { id: 'capacidad', numeric: true, disablePadding: false, label: 'Capacidad' },
    { id: 'prioridad', numeric: true, disablePadding: false, label: 'Prioridad' },
    { id: 'estado', numeric: false, disablePadding: false, label: 'Estado' },
];

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
};

const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const AprobarSolicitudesPage = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('fecha');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        fetch('http://localhost:8080/api/list/solicitudesAmbientes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener la lista de solicitudes');
                }
                return response.json();
            })
            .then(({ data }) => {
                const mappedData = data.map(item =>
                    createData(
                        item.id,
                        item.horarioDisponible.fecha,
                        item.horarioDisponible.ambiente,
                        item.horarioDisponible.horario,
                        item.horarioDisponible.capacidad,
                        item.estado,
                        item.prioridad
                    )
                );
                setData(mappedData);
                setFilteredData(mappedData);
            })
            .catch(error => {
                console.error(error);
                openSnackbar('Error al obtener la lista de solicitudes', 'error');
            });
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, row) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const updateSolicitudState = async (solicitud_id, nuevoEstado) => {
        try {
            const response = await fetch(`http://localhost:8080/api/reservarAmbiente/${solicitud_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            if (!response.ok) {
                throw new Error(`Error al ${nuevoEstado === 'Aprobado' ? 'aprobar' : 'rechazar'} la solicitud`);
            }

            openSnackbar(`Solicitud ${nuevoEstado === 'Aprobado' ? 'aprobada' : 'rechazada'} exitosamente`, 'success');
            return true;
        } catch (error) {
            console.error(error);
            openSnackbar(`Error al ${nuevoEstado === 'Aprobado' ? 'aprobar' : 'rechazar'} la solicitud`, 'error');
            return false;
        }
    };

    const handleAccept = async () => {
        if (await updateSolicitudState(selectedRow.id, 'Aprobado')) {
            const updatedData = data.map((row) =>
                row.id === selectedRow.id ? { ...row, estado: 'Aprobado' } : row
            );
            setData(updatedData);
            setFilteredData(updatedData.filter(row =>
                !searchValue || row.ambiente.includes(searchValue)
            ));
            handleClose();
        }
    };

    const handleReject = async () => {
        if (await updateSolicitudState(selectedRow.id, 'disponible')) {
            const updatedData = data.map((row) =>
                row.id === selectedRow.id ? { ...row, estado: 'disponible' } : row
            );
            setData(updatedData);
            setFilteredData(updatedData.filter(row =>
                !searchValue || row.ambiente.includes(searchValue)
            ));
            handleClose();
        }
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(filteredData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, filteredData]
    );

    const handleSearchChange = (event, newValue) => {
        setSearchValue(newValue);
        if (newValue) {
            const filtered = data.filter(row =>
                row.ambiente.includes(newValue)
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    const modalBody = (
        <Box
            sx={{
                position: 'absolute',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Detalles de la Solicitud
            </Typography>
            {selectedRow && (
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Fecha:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{selectedRow.fecha}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Ambiente:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{selectedRow.ambiente}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Horario:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{selectedRow.horario}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Capacidad:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{selectedRow.capacidad}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Estado:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{selectedRow.estado}</Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                        <Button onClick={handleAccept} variant="contained" color="primary">
                            ACEPTAR
                        </Button>
                        <Button onClick={handleReject} variant="contained" color="error">
                            RECHAZAR
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={12} lg={10}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10%',
                        background: 'black',
                    }}
                >
                    <Paper
                        sx={{
                            marginTop: '-5%',
                            boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
                            padding: '2%',
                            width: '100%',
                            backgroundColor: '#F3F6F9',
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom>
                            Aprobar Solicitudes
                        </Typography>
                        <Autocomplete
                            options={[...new Set(data.map((row) => row.ambiente))]}
                            value={searchValue}
                            onChange={handleSearchChange}
                            renderInput={(params) => <TextField {...params} label="Buscar por ambiente" variant="outlined" />}
                            sx={{ mb: 2 }}
                        />
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {visibleRows.map((row) => (
                                        <TableRow hover onClick={(event) => handleClick(event, row)} tabIndex={-1} key={row.id}>
                                            <TableCell component="th" scope="row" padding="none">
                                                {row.fecha}
                                            </TableCell>
                                            <TableCell>{row.ambiente}</TableCell>
                                            <TableCell>{row.horario}</TableCell>
                                            <TableCell align="right">{row.capacidad}</TableCell>
                                            <TableCell align="right">{row.prioridad}</TableCell>
                                            <TableCell>{row.estado}</TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                    {modalBody}
                </Modal>
            </Grid>
        </Grid>
    );
};

export default AprobarSolicitudesPage;
