import React, { useState } from 'react';

import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomCsvUploader from '../../components/organisms/customCsvUploader/CustomCsvUploader';
import CustomTable from '../../components/organisms/customTable/CustomTable';

const CargaMasivaDocentePage = () => {
  const columns = [
    { id: 'Nivel', label: 'Nivel'},
    { id: 'Codigo', label: 'Codigo'},
    { id: 'Materia', label: 'Materia'},
    { id: 'Grupo', label: 'Grupo'},
    { id: 'Tipo', label: 'Tipo'},
    { id: 'Nombre', label: 'Nombre'},
    { id: 'Apellido', label: 'Apellido'},
    { id: 'Email', label: 'Email'},
  ];

  const { openSnackbar } = useSnackbar();
  const [docentes, setDocentes] = useState([]);

  const handleOnSubmitFile = async (uploadFile) => {
    const formData = new FormData();
    formData.append('file', uploadFile);

    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/horariosMateriasArchivo`, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        if (!response.ok) {
          openSnackbar('Error en la peticion', 'error');
        }
        return response.json();
      })
      .then(data => {
        openSnackbar(data.msg, 'success');
      })
      .catch(error => {
        console.error('Error al procesar archivo: ', error);
        openSnackbar('Error al procesar archivo', 'error');
      })
  };
  
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='carga-masiva-docentes-box'
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
              Carga masiva de horarios materias CSV
            </Typography>

            <CustomCsvUploader
              onSubmit={handleOnSubmitFile}
              requiredColumns={columns.map(column => column.id)}
              setRows={setDocentes}
            />

            <CustomTable
              columns={columns}
              rows={docentes}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CargaMasivaDocentePage;
