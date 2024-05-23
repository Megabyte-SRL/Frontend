import React, { useEffect, useState } from 'react';

import { Box, Button, Chip, Grid, Paper, Typography } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import CustomTable from '../../components/organisms/customTable/CustomTable';
import SolicitarAmbienteForm from '../../components/molecules/solicitarAmbienteForm/SolicitarAmbienteForm';
import CustomModal from '../../components/organisms/customModal/CustomModal';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';

const SolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha'},
    { id: 'ambiente', label: 'Ambiente'},
    { id: 'horario', label: 'Horario'},
    { id: 'capacidad', label: 'Capacidad'},
    { id: 'estado',
      label: 'Estado',
      render: (row) => {
        switch (row.estado) {
          case 'disponible':
            return <Chip
              label={row.estado}
              style={{ backgroundColor: green[500], color: 'black' }}
            />
          case 'solicitado':
            return <Chip
              label={row.estado}
              style={{ backgroundColor: yellow[500], color: 'black' }}
            />
          default:
            return <Chip
              label={row.estado}
              style={{ backgroundColor: red[500], color: 'black' }}
            />
        }
      }
    },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => (
        <Button
          color='primary'
          variant='contained'
          onClick={() => handleOpenSolicitationForm(row)}
        >
          Solicitar
        </Button>
      )
    }
  ]; 

  const { openSnackbar } = useSnackbar();
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    fecha: '',
    ambiente: '',
    horario: '',
    capacidad: 0,
    estado: ''
  });

  useEffect(() => {
    obtenerListaHorariosDisponibles();
  }, []);

  const obtenerListaHorariosDisponibles = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/horariosDisponibles`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de horarios disponibles');
        }
        return response.json();
      })
      .then(({ data }) => {
        setHorariosDisponibles(data);
      })
      .catch(({ msg }) => {
        console.error(msg);
      });
  };

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
        console.log('Registrar solicitud ambiente response: ', data);
        openSnackbar('Solicitud registrado exitosamente', 'success');
        obtenerListaHorariosDisponibles();
        setOpenModal(false);
      })
      .catch(async error => {
        openSnackbar('Error al registrar horario', 'error');
      })
  };

  const handleOpenSolicitationForm = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  }
  
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='solicitudes-ambientes-box'
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
              Crear solicitudes ambientes
            </Typography>
            <Typography variant='body1' gutterBottom sx={{ marginLeft: '5%' }}>
              Buscar horarios ambientes:
            </Typography>

            <CustomTable
              columns={columns}
              rows={horariosDisponibles}
              onClickRow={(row) => console.log(row)}
            />
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
  );
}

export default SolicitudesPage;
