import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { Field, Formik } from 'formik';
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
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de solicitudes');
  const data = await response.json();
  return data;
};

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
  const [idSeleccionado, setIdSeleccionado] = useState(0);
  const [selectedRows, setSelectedRows] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [fechaFilter, setFechaFilter] = useState('');
  const [horaFilter, setHoraFilter] = useState([]);
  const horas = ['6:45:00 - 8:15:00', '8:15:00 - 9:45:00', '9:45:00 - 11:15:00', '11:15:00 - 12:45:00', '12:45:00 - 14:15:00', '14:15:00 - 15:45:00', '15:45:00 - 17:15:00', '17:15:00 - 18:45:00', '18:45:00 - 20:15:00', '20:15:00 - 21:45:00'];
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);
  const [selection, setSelection] = useState([]);



  const handleCheckboxChange = (event, id) => {

    setSelectedRows((prev) => (
      {
        ...prev,
        [id]: event.target.checked,
      }
    ));
    setIdSeleccionado(id);

  };


  useEffect(() => {
    const selectedRowCountElement = document.querySelector('.MuiDataGrid-selectedRowCount.css-de9k3v-MuiDataGrid-selectedRowCount');
    if (selectedRowCountElement) {
      selectedRowCountElement.remove();
    }
  }, []);

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
      .filter(row => horaFilter.length === 0 || horaFilter.includes(row.horario));
    const filteredWithIds = filtered.map((row, index) => ({ ...row, id: index + 1 }));
    setFilteredData(filteredWithIds);
  }, [data, fechaFilter, horaFilter]);

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
      })
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar('Solicitud registrada exitosamente', 'success');
        fetchHorariosDisponibles();
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al registrar horario', 'error');
      })
  };

  const handleFechaFilterChange = (event) => {
    setFechaFilter(event.target.value);
  };

  const handleHoraFilterChange = (event) => {
    setHoraFilter(event.target.value);
  };
  console.log(state);

  const obtenerFilas = (ids) => {
    const dataFilaSeleccionada = ids.map((id) => filteredData.find((row) => row.id === id));
    setAmbienteSeleccionado(dataFilaSeleccionada);
    console.log(dataFilaSeleccionada);
  };

  const enviarSugerencia=()=>{
    
    const objSolicitud={
      idSolicitud: state.id,
      ambientes: ambienteSeleccionado,
    }
    console.log(objSolicitud);
  }
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
                    <InputLabel>Horas</InputLabel>
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

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Box sx={{ width: '100%' }}>
                    <DataGrid
                      checkboxSelection
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
                      onRowSelectionModelChange={(ids) => obtenerFilas(ids)}
                      





                    />
                    <pre style={{ fontSize: 10 }}>
                      {JSON.stringify(ambienteSeleccionado, null, 4)}
                    </pre>
                    

                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={enviarSugerencia}
                  >
                    Enviar Sugerencia
                  </Button>
                </Grid>

              </Grid>

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
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Formik>
  );
}

export default SugerirAmbientesPage;