import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import CustomTable from '../../components/organisms/customTable/CustomTable';
import CustomAddIcon from '../../components/atoms/customAddIcon/CustomAddIcon';
import CustomDeleteIcon from '../../components/atoms/customDeleteIcon/CustomDeleteIcon';
import CustomModal from '../../components/organisms/customModal/CustomModal';
import FormAgregarHorario from '../../components/molecules/formAgregarHorario/FormAgregarHorario';

const AmbientesPage = () => {
  const columns = [
    { id: 'nombre', label: 'Nombre Ambiente' },
    { id: 'capacidad', label: 'Capacidad' },
    { id: 'descripcion', label: 'Descripción' },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => (
        <>
          <CustomAddIcon onClick={() => handleOpenHorarioForm(row)} />
          <CustomDeleteIcon onClick={() => handleEliminar(row.id)} />
        </>
      )
    },
  ];

  const [ambientes, setAmbientes] = useState([]);
  const { openSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    nombre: '',
    descripcion: '',
    capacidad: 0
  });

  useEffect(() => {
    obtenerListaAmbientes();
  }, []);

  const obtenerListaAmbientes = async () => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/ambientes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de ambientes');
        }
        return response.json();
      })
      .then(({ data }) => {
        setAmbientes(data);
      })
      .catch(({ msg }) => {
        console.error(msg);
      });
  };

  const handleEliminar = async (id) => {
    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/ambientes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        const data = await response.json();
        console.log('Eliminar ambiente data: ', data);
        openSnackbar('Ambiente Borrado', 'success');
        obtenerListaAmbientes();
      })
      .catch(error => {
        openSnackbar('Error al eliminar el ambiente', 'error');
      });
  };

  const handleOpenHorarioForm = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

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
              Ambientes registrados
            </Typography>
            <Typography variant='body1' gutterBottom sx={{ marginLeft: '5%' }}>
              Buscar ambientes registrados:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}>
              <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Nombre:</Typography>
              <TextField variant="outlined" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
              <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Capacidad:</Typography>
              <TextField variant="outlined" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
            </Box>
            <CustomTable
              columns={columns}
              rows={ambientes}
              onClickRow={(row) => console.log(row)}
            />
            <CustomModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              title='AGREGAR HORARIO'
            >
              <FormAgregarHorario
                row={selectedRow}
                onClose={() => setOpenModal(false)}
              />
            </CustomModal>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AmbientesPage;
