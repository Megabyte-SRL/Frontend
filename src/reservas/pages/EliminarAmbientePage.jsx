import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { DeleteTable } from '../components';
import { Search as SearchIcon } from '@mui/icons-material'

import { useSnackbar } from '../organisms/snackbarProvider/SnackbarProvider';

const EliminarAmbientePage = () => {
    const [ambientes, setAmbientes] = useState([]);
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        obtenerListaAmbientes();
    }, []);

    const obtenerListaAmbientes = () => {
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

    const handleEliminar = (id) => {
        fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/ambientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                openSnackbar('Ambiente Borrado', 'success');
                obtenerListaAmbientes();
            })
            .catch(error => {
                openSnackbar('Error al eliminar el ambiente', 'error');
            })
    };

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
          <Box
            id='eliminar-ambiente-box'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10%',
              background: 'black',
              minHeight: 'calc(100vh - 20px)'
            }}
          >
            <Paper sx={{
              marginTop: '-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
              padding: '2%',
              width: '100%',
              backgroundColor: '#F3F6F9',
            }}>
              <Typography variant="h4" align="center" gutterBottom>
                ELIMINAR AMBIENTE
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ marginLeft: '5%' }}>
                Buscar ambientes:
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
                      {/* <SearchComponent /> */}
                      <IconButton>
                        <SearchIcon color="primary" />
                      </IconButton>
                     </InputAdornment>
                  ),
                }} />
              </Box>
              <DeleteTable data={ambientes} handleEliminar={handleEliminar} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    );
};

export default EliminarAmbientePage;