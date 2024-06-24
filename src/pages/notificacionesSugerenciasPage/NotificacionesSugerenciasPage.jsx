import React, { useState } from 'react';
import {
  Paper,
  IconButton,
  Grid,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import useTable from '../../hooks/useTable';
import CustomSearchableTable from '../../components/organisms/customSearchableTable/CustomSearchableTable';

const fetchSugerencias = async (params) => {
  params.estado = 'sugerido';
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/solicitudesAmbientes?${query}`, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de solicitudes');
  const data = await response.json();
  return data;
};

const NotificacionesSugerenciasPage = () => {
  const columns = [
    { id: 'ambiente', label: 'Ambiente', sortable: true, filterable: false },
    { id: 'fecha', label: 'Fecha', sortable: true, filterable: false },
    { id: 'horario', label: 'Horario', sortable: true, filterable: false },
    { id: 'capacidadAmbiente', label: 'Capacidad ambiente', sortable: true, filterable: false },
    {
      id: 'acciones',
      label: 'Acciones',
      sortable: false,
      filterable: false,
      render: (row) => (
        <>
          <IconButton color='success' onClick={() => handleOpenDialog('approve', row)}>
            <CheckCircleIcon />
          </IconButton>
          <IconButton color='error' onClick={() => handleOpenDialog('reject', row)}>
            <CancelIcon />
          </IconButton>
        </>
      )
    },
  ];

  const { openSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
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
    refreshData,
  } = useTable(fetchSugerencias, 'asc', 'fecha', setFetchParams);

  const handleOpenDialog = (action, row) => {
    console.log('handleOpenDialog row: ', row);
    setDialogAction(action);
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogAction(null);
    setSelectedRow(null);
  };

  const handleAcceptSugerencia = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/aprobarSugerencia/${solicitudId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
        refreshData(fetchParams);
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleRejectSugerencia = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/rechazarSugerencia/${solicitudId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
      .then(async response => {
        const data = await response.json();
        openSnackbar(data.msg, 'success');
        refreshData(fetchParams);
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleConfirmAction = async () => {
    if (dialogAction === 'approve') {
      console.log('Approved: ', selectedRow);
      handleAcceptSugerencia(selectedRow.id);
    } else if (dialogAction === 'reject') {
      console.log('Rejected: ', selectedRow);
      handleRejectSugerencia(selectedRow.id);
    }
    handleCloseDialog();
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='notificaciones-sugerencias-box'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10%',
            background: 'black',
            minHeight: 'cal(100vh - 20px)',
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
              Lista de sugerencias de ambientes
            </Typography>
            <CustomSearchableTable
              columns={columns}
              data={data.map(
                notificacionSugerencia => ({
                  id: notificacionSugerencia.id,
                  ambiente: notificacionSugerencia.horarioDisponible.ambiente,
                  fecha: notificacionSugerencia.horarioDisponible.fecha,
                  horario: notificacionSugerencia.horarioDisponible.horario,
                  capacidadAmbiente: notificacionSugerencia.horarioDisponible.capacidad,
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
              onClickRow={(row) => console.log(row)}
              loading={loading}
            />
          </Paper>
        </Box>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas {dialogAction === 'approve' ? 'aprobar' : 'rechazar'} esta sugerencia?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant='contained' color='secondary'>
            Cancelar
          </Button>
          <Button onClick={handleConfirmAction} variant='contained' color='primary'>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default NotificacionesSugerenciasPage;
