import React, { useEffect, useState } from 'react';

import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../../components/organisms/customTable/CustomTable';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import CustomModal from '../../components/organisms/customModal/CustomModal';
import InformationVerificarSolicitudForm from '../../components/molecules/informacionVerificarSolicitudForm/InformationVerificarSolicitudForm';

const VerficarSolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha'},
    { id: 'fechaSolicitud', label: 'Fecha solicitud'},
    { id: 'ambiente', label: 'Ambiente'},
    { id: 'horario', label: 'Horario'},
    { id: 'capacidadAmbiente', label: 'Capacidad ambiente'},
    { id: 'capacidadReserva', label: 'Capacidad reserva' },
    { id: 'prioridad', label: 'Prioridad' },
  ];

  const { openSnackbar } = useSnackbar();
  const [solicitudes, setSolicitudes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    obtenerListaSolicitudes();
  }, []);

  const obtenerListaSolicitudes = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/solicitudesAmbientes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de horarios disponibles');
        }
        return response.json();
      })
      .then(({ data }) => {
        setSolicitudes(data);
      })
      .catch(({ msg }) => {
        console.error(msg);
      });
  };

  const handleOnSubmitReserva = async (solicitudId) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/reservarAmbiente/${solicitudId}`, {
      method: 'POST',
    })
      .then(async response => {
        const data = await response.json();
        console.log('Registrar solicitud ambiente response: ', data);
        openSnackbar('Solicitud registrado exitosamente', 'success');
        obtenerListaSolicitudes();
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al reservar ambiente', 'error');
      })
  };

  const handleOpenReservaForm = (row) => {
    setSelectedRow(solicitudes.find(solicitud => solicitud.id === row.id));
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
            
            <CustomTable
              columns={columns}
              rows={solicitudes.map(
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
              onClickRow={(row) => handleOpenReservaForm(row)}
            />
            <CustomModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              title='Detalles de la solicitud'
            >
              <InformationVerificarSolicitudForm
                row={selectedRow}
                onClose={() => setOpenModal(false)}
                onSubmit={handleOnSubmitReserva}
              />
            </CustomModal>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default VerficarSolicitudesPage;
