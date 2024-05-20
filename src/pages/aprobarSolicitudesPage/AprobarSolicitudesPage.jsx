import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, Paper, Modal, Button, Grid } from '@mui/material'
import { useState, useMemo, useEffect } from 'react'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider'

const createData = (id, fecha, ambiente, horario, capacidad, estado, prioridad) => ({
    id,
    fecha,
    ambiente,
    horario,
    capacidad,
    estado,
    prioridad,
})

const rows = [
    createData(1, '2023-05-16', 'Aula 101', '08:00 - 10:00', 30, 'Pendiente', 3),
    createData(2, '2023-05-15', 'Aula 102', '10:00 - 12:00', 25, 'Pendiente', 2),
    createData(3, '2023-05-16', 'Aula 103', '12:00 - 14:00', 20, 'Pendiente', 5),
    createData(4, '2023-05-16', 'Aula 104', '14:00 - 16:00', 35, 'Rechazado', 1),
    createData(5, '2023-05-17', 'Aula 105', '16:00 - 18:00', 40, 'Aprobado', 4),
    createData(6, '2023-05-18', 'Aula 106', '08:00 - 10:00', 30, 'Aprobado', 6),
]

const headCells = [
    { id: 'fecha', numeric: false, disablePadding: true, label: 'Fecha' },
    { id: 'ambiente', numeric: false, disablePadding: false, label: 'Ambiente' },
    { id: 'horario', numeric: false, disablePadding: false, label: 'Horario' },
    { id: 'capacidad', numeric: true, disablePadding: false, label: 'Capacidad' },
    { id: 'prioridad', numeric: true, disablePadding: false, label: 'Prioridad' },
    { id: 'estado', numeric: false, disablePadding: false, label: 'Estado' },
]

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1
    if (b[orderBy] > a[orderBy]) return 1
    return 0
}

const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

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
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
}

const AprobarSolicitudesPage = () => {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('fecha')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [open, setOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [data, setData] = useState(rows)
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        const updatePriorities = () => {
            const updatedData = [...data];
            const ambientes = {};

            // Agrupar por ambiente y ordenar por fecha
            updatedData.forEach(row => {
                if (!ambientes[row.ambiente]) {
                    ambientes[row.ambiente] = [];
                }
                ambientes[row.ambiente].push(row);
            });

            for (const ambiente in ambientes) {
                if (ambientes[ambiente].length > 1) {
                    // Ordenar por fecha
                    ambientes[ambiente].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                    // Aumentar prioridad de la primera fecha
                    let firstDate = new Date(ambientes[ambiente][0].fecha);
                    ambientes[ambiente].forEach(row => {
                        if (new Date(row.fecha).getTime() === firstDate.getTime()) {
                            row.prioridad += 1;
                        }
                    });
                }
            }

            setData(updatedData);
        };

        updatePriorities();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleClick = (event, row) => {
        setSelectedRow(row)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedRow(null)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleAccept = () => {
        const updatedData = data.map((row) =>
            row.id === selectedRow.id ? { ...row, estado: 'Aprobado' } : row
        )
        setData(updatedData)
        handleClose()
        openSnackbar('Solicitud aprobada exitosamente', 'success');
    }

    const handleReject = () => {
        const updatedData = data.map((row) =>
            row.id === selectedRow.id ? { ...row, estado: 'Rechazado' } : row
        )
        setData(updatedData)
        handleClose()
        openSnackbar('Solicitud rechazada exitosamente', 'success');
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

    const visibleRows = useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, data]
    )

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
                            <Typography variant="body1" align="left"><strong>Fecha:</strong> {selectedRow.fecha}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="right"><strong>Ambiente:</strong> {selectedRow.ambiente}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="left"><strong>Horario:</strong> {selectedRow.horario}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="right"><strong>Capacidad:</strong> {selectedRow.capacidad}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="left"><strong>Prioridad:</strong> {selectedRow.prioridad}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="left"><strong>Estado:</strong> {selectedRow.estado}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button onClick={handleAccept} variant="contained" color="primary">
                    ACEPTAR
                </Button>
                <Button onClick={handleReject} variant="contained" color="error">
                    RECHAZAR
                </Button>
            </Box>
        </Box>
    )

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
                            count={data.length}
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
    )
}

export default AprobarSolicitudesPage
