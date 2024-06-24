import React, { useState, useEffect } from 'react';
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
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de solicitudes');
  const data = await response.json();
  return data;
};

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
  const [fechaFilter, setFechaFilter] = useState(state.horarioDisponible.fecha ? [state.horarioDisponible.fecha] : []);
  const [horaFilter, setHoraFilter] = useState(state.horarioDisponible.horario ? [state.horarioDisponible.horario] : []);
  const horas = ['6:45:00 - 8:15:00', '8:15:00 - 9:45:00', '9:45:00 - 11:15:00', '11:15:00 - 12:45:00', '12:45:00 - 14:15:00', '14:15:00 - 15:45:00', '15:45:00 - 17:15:00', '17:15:00 - 18:45:00', '18:45:00 - 20:15:00', '20:15:00 - 21:45:00'];
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);
  const [capacidadTotalSeleccionada, setCapacidadTotalSeleccionada] = useState(0); // Nuevo estado

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const selectedCapacidad = data.find(row => row.id === id).capacidad;

    setSelectedRows((prev) => ({
      ...prev,
      [id]: isChecked,
    }));

    setCapacidadTotalSeleccionada((prevTotal) => 
      isChecked ? prevTotal + selectedCapacidad : prevTotal - selectedCapacidad
    );
  };

  useEffect(() => {
    const selectedRowCountElement = document.querySelector('.MuiDataGrid-selectedRowCount.css-de9k3v-MuiDataGrid-selectedRowCount');
    if (selectedRowCountElement) {
      selectedRowCountElement.remove();
    }
  }, []);

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
      })
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
        handleRejectReserva(state.id);
        navigate('/dashboard/verificar-solicitudes');
      })
      .catch(async error => {
        openSnackbar('Error al registrar sugerencias', 'error');
      });
  };

  const handleFechaFilterChange = (event) => {
    const newFechaFilter = event.target.value;
    setFechaFilter(newFechaFilter);
  };

  const handleHoraFilterChange = (event) => {
    const newHoraFilter = event.target.value;
    setHoraFilter(newHoraFilter);
  };

  const filteredData = React.useMemo(() => {
    return data.filter(row => {
      // Filtro por fecha
      if (fechaFilter && row.fecha !== fechaFilter) {
        return false;
      }
      
      // Filtro por horario
      if (horaFilter.length > 0) {
        return horaFilter.includes(row.horario);
      }
      
      return true; // Si no hay filtros aplicados, muestra todas las filas
    });
  }, [data, fechaFilter, horaFilter]);

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
                    label='Capacidad Solicitada'
                    variant='outlined'
                    fullWidth
                    value={state.capacidad}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <CustomSearchableTable
                    columns={columns}
                    data={filteredData}
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
                </Grid>

                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={handleOnSubmitSugerencias}
                    disabled={capacidadTotalSeleccionada < state.capacidad} // Botón deshabilitado si la capacidad es menor
                  >
                    Enviar Sugerencia
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Formik>
  );
}

export default SugerirAmbientesPage;