import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, Paper, Modal, Button, Grid } from '@mui/material'
import { useState, useMemo } from 'react'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'

const createData = (id, fecha, ambiente, horario, capacidad, estado) => ({
    id,
    fecha,
    ambiente,
    horario,
    capacidad,
    estado,
})

const rows = [
    createData(1, '2023-05-15', 'Aula 101', '08:00 - 10:00', 30, 'Pendiente'),
    createData(2, '2023-05-15', 'Aula 102', '10:00 - 12:00', 25, 'Aprobado'),
    createData(3, '2023-05-16', 'Aula 103', '12:00 - 14:00', 20, 'Rechazado'),
    createData(4, '2023-05-16', 'Aula 104', '14:00 - 16:00', 35, 'Pendiente'),
    createData(5, '2023-05-17', 'Aula 105', '16:00 - 18:00', 40, 'Aprobado'),
    createData(6, '2023-05-18', 'Aula 106', '08:00 - 10:00', 30, 'Pendiente'),
    createData(7, '2023-05-18', 'Aula 107', '10:00 - 12:00', 25, 'Aprobado'),
    createData(8, '2023-05-19', 'Aula 108', '12:00 - 14:00', 20, 'Rechazado'),
    createData(9, '2023-05-19', 'Aula 109', '14:00 - 16:00', 35, 'Pendiente'),
    createData(10, '2023-05-20', 'Aula 110', '16:00 - 18:00', 40, 'Aprobado'),
    createData(11, '2023-05-21', 'Aula 111', '08:00 - 10:00', 30, 'Pendiente'),
    createData(12, '2023-05-21', 'Aula 112', '10:00 - 12:00', 25, 'Aprobado'),
    createData(13, '2023-05-22', 'Aula 113', '12:00 - 14:00', 20, 'Rechazado'),
    createData(14, '2023-05-22', 'Aula 114', '14:00 - 16:00', 35, 'Pendiente'),
    createData(15, '2023-05-23', 'Aula 115', '16:00 - 18:00', 40, 'Aprobado'),
    createData(16, '2023-05-24', 'Aula 116', '08:00 - 10:00', 30, 'Pendiente'),
    createData(17, '2023-05-24', 'Aula 117', '10:00 - 12:00', 25, 'Aprobado'),
    createData(18, '2023-05-25', 'Aula 118', '12:00 - 14:00', 20, 'Rechazado'),
    createData(19, '2023-05-25', 'Aula 119', '14:00 - 16:00', 35, 'Pendiente'),
    createData(20, '2023-05-26', 'Aula 120', '16:00 - 18:00', 40, 'Aprobado'),
]

const headCells = [
    { id: 'fecha', numeric: false, disablePadding: true, label: 'Fecha' },
    { id: 'ambiente', numeric: false, disablePadding: false, label: 'Ambiente' },
    { id: 'horario', numeric: false, disablePadding: false, label: 'Horario' },
    { id: 'capacidad', numeric: true, disablePadding: false, label: 'Capacidad' },
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
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
                        <Grid item xs={12}>
                            <Typography variant="body1" align="left"><strong>Estado:</strong> {selectedRow.estado}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button onClick={handleClose} variant="contained" color="primary">
                    ACEPTAR
                </Button>
                <Button onClick={handleClose} variant="contained" color="error">
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
                        minHeight: 'calc(100vh - 20px)',
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
                            Aprobar Solicitudes de Ambiente
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
                            count={rows.length}
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
