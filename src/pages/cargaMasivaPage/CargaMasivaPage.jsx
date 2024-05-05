import React, { useState } from 'react';

import { useSnackbar } from '../../reservas/organisms/snackbarProvider/SnackbarProvider';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../../components/organisms/customTable/CustomTable';
import CustomCsvUploader from '../../components/organisms/customCsvUploader/CustomCsvUploader';

const CargaMasivaPage = () => {
  const columns = [
    { id: 'Ambiente', label: 'Ambiente' },
    { id: 'Capacidad', label: 'Capacidad' },
    { id: 'Descripcion', label: 'Descripción' },
    { id: 'Lugar', label: 'Lugar' },
    { id: 'Piso', label: 'Piso' },
    { id: 'Edificio', label: 'Edificio' },
    { id: 'Fecha', label: 'Fecha' },
    { id: 'Horario', label: 'Horario' },
  ];

  const { openSnackbar } = useSnackbar();
  const [ambientes, setAmbientes] = useState([]);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
          id='carga-masiva-ambientes-box'
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
              Carga Masiva de Datos CSV
            </Typography>
            
            <CustomCsvUploader
              requiredColumns={columns.map(column => column.id)}
              setRows={setAmbientes}
            />

            <CustomTable
              columns={columns}
              rows={ambientes}
              onClickRow={(row) => console.log(row)}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CargaMasivaPage;
