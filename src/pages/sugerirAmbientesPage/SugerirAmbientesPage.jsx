import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Box, Button, Chip, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { Formik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import SolicitarAmbienteForm from '../../components/molecules/solicitarAmbienteForm/SolicitarAmbienteForm';
import CustomModal from '../../components/organisms/customModal/CustomModal';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import useTable from '../../hooks/useTable';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const fetchHorariosDisponibles = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/horariosDisponibles?${query}`, {
=======

import { Box, Button, Chip, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { Formik } from 'formik';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import useTable from '../../hooks/useTable';
import CustomSearchableTable from '../../components/organisms/customSearchableTable/CustomSearchableTable';
import { useLocation, useNavigate } from 'react-router-dom';

const fetchHorariosDisponibles = async (params) => {
  params.estado = 'disponible';
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/horarios?${query}`, {
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de solicitudes');
  const data = await response.json();
  return data;
};

<<<<<<< HEAD
const renderEstado = (params) => {
  switch (params.value) {
    case 'disponible':
      return <Chip label={params.value} style={{ borderRadius: '10%', backgroundColor: "#01AB5E", color: 'white' }} />;
    case 'solicitado':
      return <Chip label={params.value} style={{ borderRadius: '10%', backgroundColor: yellow[500], color: 'black' }} />;
    default:
      return <Chip label={params.value} style={{ backgroundColor: red[500], color: 'white' }} />;
  }
};

const SugerirAmbientesPage = () => {

  const { state } = useLocation();
  const [selectedRows, setSelectedRows] = useState({});
  const [filteredData, setFilteredData] = useState([]);
=======
const SugerirAmbientesPage = () => {
  const columns = [
    { id: 'id', label: 'Id', sortable: true, filterable: false },
    { id: 'fecha', label: 'Fecha solicitud', sortable: true, filterable: false },
    { id: 'ambiente', label: 'Ambiente', sortable: true, filterable: false },
    { id: 'horario', label: 'Horario', sortable: true, filterable: false },
    { id: 'capacidad', label: 'Capacidad', sortable: true, filterable: false },
    {
      id: 'estado',
      label: 'Estado',
      sortable: false,
      filterable: false,
      render: (row) => {
        switch (row.estado) {
          case 'disponible':
            return <Chip
              label={row.estado}
              style={{ borderRadius: '10%', backgroundColor: "#01AB5E", color: 'white' }}
            />;
          case 'solicitado':
            return <Chip
              label={row.estado}
              style={{ borderRadius: '10%', backgroundColor: yellow[500], color: 'black' }}
            />;
          default:
            return <Chip
              label={row.estado}
              style={{ backgroundColor: red[500], color: 'white' }}
            />;
        }
      }
    },
    {
      id: 'seleccionar',
      label: 'Seleccionar',
      sortable: false,
      filterable: false,
      render: (params) => (
        <Checkbox
          checked={selectedRows[params.id] || false}
          onChange={(event) => handleCheckboxChange(event, params.id)}
        />
      ),
    }
  ];

  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({});
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
  const [fechaFilter, setFechaFilter] = useState(state.horarioDisponible.fecha ? [state.horarioDisponible.fecha] : []);
  const [horaFilter, setHoraFilter] = useState(state.horarioDisponible.horario ? [state.horarioDisponible.horario] : []);
  const [capacidadFilter, setCapacidadFilter] = useState(state.horarioDisponible.capacidad ? [state.horarioDisponible.capacidad] : []);

  const horas = ['6:45:00 - 8:15:00', '8:15:00 - 9:45:00', '9:45:00 - 11:15:00', '11:15:00 - 12:45:00', '12:45:00 - 14:15:00', '14:15:00 - 15:45:00', '15:45:00 - 17:15:00', '17:15:00 - 18:45:00', '18:45:00 - 20:15:00', '20:15:00 - 21:45:00'];
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);

  const handleCheckboxChange = (event, id) => {
    setSelectedRows((prev) => (
      {
        ...prev,
        [id]: event.target.checked,
      }
    ));
    obtenerFilas({ ...selectedRows, [id]: event.target.checked }); // Llamar obtenerFilas aquí
  };

  useEffect(() => {
    const selectedRowCountElement = document.querySelector('.MuiDataGrid-selectedRowCount.css-de9k3v-MuiDataGrid-selectedRowCount');
    if (selectedRowCountElement) {
      selectedRowCountElement.remove();
    }
  }, []);

<<<<<<< HEAD
  const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    {
      field: 'fecha',
      headerName: 'Fecha solicitud',
      width: 180,
      valueFormatter: (params) => moment(params.value).format('DD/MM/YYYY'),
    },
    { field: 'ambiente', headerName: 'Ambiente', width: 180 },
    { field: 'horario', headerName: 'Horario', width: 180 },
    { field: 'capacidad', headerName: 'Capacidad', width: 150 },
    { field: 'estado', headerName: 'Estado', width: 180, renderCell: renderEstado },
    {
      field: 'seleccionar',
      headerName: 'Seleccionar',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={selectedRows[params.id] || false}
          onChange={(event) => handleCheckboxChange(event, params.id)}
        />
      ),
    }
  ];

  const { openSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    fecha: '',
    ambiente: '',
    horario: '',
    capacidad: 0,
    estado: ''
  });

  const {
    data,
  } = useTable(fetchHorariosDisponibles, 'asc', 'fecha', { estado: 'disponible' });

  useEffect(() => {
    const filtered = data
      .filter(row => row.estado === 'disponible')
      .filter(row => !fechaFilter || row.fecha === fechaFilter)
      .filter(row => horaFilter.length === 0 || horaFilter.includes(row.horario))
      .filter(row => !capacidadFilter || row.capacidad >= capacidadFilter);
    const filteredWithIds = filtered.map((row, index) => ({ ...row, id: index + 1 }));
    setFilteredData(filteredWithIds);
  }, [data, fechaFilter, horaFilter, capacidadFilter]);

  const handleOnSubmitSolicitud = async (values) => {
    const [, grupoId] = values.grupo.split('-');

    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/solicitudesAmbientes`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        horarioDisponibleId: values.id,
        grupoId: grupoId,
        capacidad: values.capacidad,
        tipoReserva: values.tipoReserva,
        docentes: values.docentes
=======
  const { openSnackbar } = useSnackbar();

  const {
    data,
    searchText,
    handleSearchChange,
    filters,
    handleFilterChange,
    order,
    orderBy,
    handleSort,
    rowsPerPage,
    page,
    handlePageChange,
    handleRowsPerPageChange,
    totalRows,
    loading,
  } = useTable(fetchHorariosDisponibles, 'asc', 'fecha');

  const handleRejectReserva = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/rechazarSolicitud/${solicitudId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
      })
      .catch(async error => {
        openSnackbar('Error al rechazar ambiente', 'error');
      })
  };

  const handleOnSubmitSugerencias = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/sugerirAmbientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        horariosDisponibles: ambienteSeleccionado,
        docenteId: state.docenteSolicitante.id,
        grupoId: state.grupo.id,
        capacidad: state.capacidad,
        tipoReserva: state.tipoReserva,
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
      })
    })
      .then(async response => {
        const data = await response.json();
<<<<<<< HEAD
        openSnackbar('Solicitud registrada exitosamente', 'success');
        fetchHorariosDisponibles();
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al registrar horario', 'error');
      })
=======
        openSnackbar(data.msg, 'success');
        handleRejectReserva(state.id);
        navigate('/dashboard/verificar-solicitudes');
      })
      .catch(async error => {
        openSnackbar('Error al registrar sugerencias', 'error');
      });
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
  };

  const handleFechaFilterChange = (event) => {
    setFechaFilter(event.target.value);
  };

  const handleHoraFilterChange = (event) => {
    setHoraFilter(event.target.value);
  };

  const handleCapacidadFilterChange = (event) => {
    setCapacidadFilter(event.target.value);
  };

  const obtenerFilas = (selectedRows) => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
<<<<<<< HEAD
    const dataFilaSeleccionada = selectedIds.map((id) => filteredData.find((row) => row.id === parseInt(id)));
    setAmbienteSeleccionado(dataFilaSeleccionada);
    console.log(dataFilaSeleccionada);
  };

  const enviarSugerencia = () => {
    const objSolicitud = {
      idSolicitud: state.id,
      ambientes: ambienteSeleccionado,
    }
    console.log(objSolicitud);
  }

=======
    setAmbienteSeleccionado(selectedIds);
  };

>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
  return (
    <Formik>
      <Grid container justifyContent='center'>
        <Grid item xs={10} md={12} lg={11}>
          <Box
            id='verificar-solicitudes-box'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
              minHeight: '90%',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Paper
              sx={{
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                padding: '2rem',
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '8px'
              }}
            >
              <Typography variant='h4' align='center' gutterBottom>
                Ambientes Disponibles
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={2} sx={{ mt: 2, ml: 5 }}>
                  <TextField
                    name='fecha'
                    type='date'
                    label='Fecha'
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={fechaFilter}
                    onChange={handleFechaFilterChange}
                  />
                </Grid>

                <Grid item xs={2.3} sx={{ mt: 2, ml: 25 }}>
                  <FormControl fullWidth>
                    <InputLabel>Horarios</InputLabel>
                    <Select
                      name='hora'
                      label='Hora'
                      multiple
                      value={horaFilter}
                      onChange={handleHoraFilterChange}
                    >
                      {horas.map((hora) => (
                        <MenuItem key={hora} value={hora}>
                          {hora}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2.3} sx={{ mt: 2, ml: 5 }}>
                  <TextField
                    name='capacidad'
                    type='number'
                    label='Capacidad Mínima'
                    variant='outlined'
                    fullWidth
                    value={capacidadFilter}
                    onChange={handleCapacidadFilterChange}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
<<<<<<< HEAD
                  <Box sx={{ width: '100%' }}>
                    <DataGrid
                      rows={filteredData}
                      columns={columns}
                      sx={{
                        "& .MuiDataGrid-cell:focus": {
                          outline: "none",
                        },
                      }}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                    <pre style={{ fontSize: 10 }}>
                      {JSON.stringify(ambienteSeleccionado, null, 4)}
                    </pre>
                  </Box>
=======
                  <CustomSearchableTable
                    columns={columns}
                    data={data}
                    order={order}
                    orderBy={orderBy}
                    onSort={handleSort}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalRows={totalRows}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onFilterChange={handleFilterChange}
                    searchText={searchText}
                    onSearchChange={handleSearchChange}
                    onClickRow={(row) => console.log(row)}
                    loading={loading}
                  />
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
                </Grid>

                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
<<<<<<< HEAD
                    onClick={() => { obtenerFilas(selectedRows); enviarSugerencia(); }}
=======
                    onClick={() => handleOnSubmitSugerencias()}
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
                  >
                    Enviar Sugerencia
                  </Button>
                </Grid>
              </Grid>
<<<<<<< HEAD

              <CustomModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title='Solicitar Ambiente'
              >
                <SolicitarAmbienteForm
                  row={selectedRow}
                  onClose={() => setOpenModal(false)}
                  onSubmit={handleOnSubmitSolicitud}
                />
              </CustomModal>

              {/* Mostrar el estado en el retorno */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Estado recibido:</Typography>
                <pre>Fecha solicitud: {JSON.stringify(state.fechaSolicitud, null, 2)}</pre>
                <pre>Fecha reserva: {JSON.stringify(state.horarioDisponible.fecha, null, 2)}</pre>
                <pre>Docente: {JSON.stringify(state.docenteSolicitante.nombre, null, 2)}</pre>
                <pre>ID Docente: {JSON.stringify(state.docenteSolicitante.id, null, 2)}</pre>
                <pre>Horario: {JSON.stringify(state.horarioDisponible.horario, null, 2)}</pre>
              </Box>
=======
>>>>>>> d5dd86262a62ee74f8db1a00afa8d4ac27b2b3d6
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Formik>
  );
}

export default SugerirAmbientesPage;
