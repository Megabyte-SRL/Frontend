import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import useTable from '../../hooks/useTable';
import CustomSearchableTable from '../../components/organisms/customSearchableTable/CustomSearchableTable';
import CustomModal from '../../components/organisms/customModal/CustomModal';
import InformacionSugerenciaAceptadaForm from '../../components/molecules/informacionSugerenciaAceptadaForm/InformacionSugerenciaAceptadaForm';

const fetchNotificacionesAceptadas = async (params) => {
  params.estado = 'aceptado';
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/solicitudesAmbientes?${query}`, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de notificaciones');
  const data = await response.json();
  return data;
};

const AprobarSolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha', sortable: true, filterable: true },
    { id: 'fechaSolicitud', label: 'Fecha solicitud', sortable: true, filterable: true },
    { id: 'ambiente', label: 'Ambiente', sortable: true, filterable: true },
    { id: 'horario', label: 'Horario', sortable: true, filterable: true },
    { id: 'capacidadAmbiente', label: 'Capacidad ambiente', sortable: true, filterable: true },
    { id: 'capacidadReserva', label: 'Capacidad reserva', sortable: true, filterable: true },
    { id: 'prioridad', label: 'Prioridad', sortable: true, filterable: true },
  ];

  const { openSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [fetchParams, setFetchParams] = useState({});

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
    refreshData
  } = useTable(fetchNotificacionesAceptadas, 'asc', 'fecha', setFetchParams);

  const handleAcceptReserva = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/aprobarSolicitud/${selectedRow.id}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        console.log('Registrar solicitud ambiente response: ', data);
        openSnackbar(data.msg, 'success');
        refreshData(fetchParams);
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleRejectReserva = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/rechazarSolicitud/${selectedRow.id}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
        refreshData(fetchParams);
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleOpenReservaForm = (row) => {
    const solicitud = data.find(solicitud => solicitud.id === row.id);
    setSelectedRow(solicitud);
    setOpenModal(true);
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='verificar-solicitudes-box'
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
            <Typography variant='h4' align='center' gutterBottom>
              Aprobar sugerencias aceptadas
            </Typography>

            <CustomSearchableTable
              columns={columns}
              data={data.map(
                solicitud => ({
                  id: solicitud.id,
                  fecha: solicitud.horarioDisponible.fecha,
                  fechaSolicitud: solicitud.fechaSolicitud,
                  ambiente: solicitud.horarioDisponible.ambiente,
                  horario: solicitud.horarioDisponible.horario,
                  capacidadAmbiente: solicitud.horarioDisponible.capacidad,
                  capacidadReserva: solicitud.capacidad,
                  prioridad: solicitud.prioridad
                })
              )}
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
              onClickRow={(row) => handleOpenReservaForm(row)}
              loading={loading}
            />
            <CustomModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              title='Detalles de la solicitud'
            >
              <InformacionSugerenciaAceptadaForm
                row={selectedRow}
                onClose={() => setOpenModal(false)}
                onAccept={handleAcceptReserva}
                onReject={handleRejectReserva}
              />
            </CustomModal>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AprobarSolicitudesPage;
