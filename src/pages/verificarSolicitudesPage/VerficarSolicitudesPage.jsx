import React, { useState } from 'react';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import CustomModal from '../../components/organisms/customModal/CustomModal';
import InformationVerificarSolicitudForm from '../../components/molecules/informacionVerificarSolicitudForm/InformationVerificarSolicitudForm';
import useTable from '../../hooks/useTable';
import CustomSearchableTable from '../../components/organisms/customSearchableTable/CustomSearchableTable';
import { useNavigate } from 'react-router-dom';

const fetchSolicitudes = async (params) => {
  params.estado = 'solicitado';
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/solicitudesAmbientes?${query}`, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de solicitudes');
  const data = await response.json();
  return data;
}

const VerficarSolicitudesPage = () => {
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
  const navigate = useNavigate();
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
  } = useTable(fetchSolicitudes, 'asc', 'fecha', setFetchParams);

  const handleAcceptReserva = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/aprobarSolicitud/${solicitudId}`, {
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

  const handleSuggestAmbientes = async () => {
    navigate('/dashboard/sugerir-ambientes', {state: selectedRow});
  };

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
        refreshData(fetchParams);
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleOpenReservaForm = (row) => {
    const solicitud = data.find(solicitud => solicitud.id === row.id);
    const docenteSolicitante = {
      id: solicitud.docente.id,
      nombre: `${solicitud.docente.nombre} ${solicitud.docente.apellido}`
    };
    setSelectedRow({ ...solicitud, docenteSolicitante });
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
              Verificar solicitudes de reserva
            </Typography>
            <Typography variant='body1' gutterBottom sx={{ marginLeft: '5%' }}>
              Buscar solicitudes:
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
              <InformationVerificarSolicitudForm
                row={selectedRow}
                onClose={() => setOpenModal(false)}
                onAccept={handleAcceptReserva}
                onSuggest={handleSuggestAmbientes}
                onReject={handleRejectReserva}
              />
            </CustomModal>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default VerficarSolicitudesPage;
