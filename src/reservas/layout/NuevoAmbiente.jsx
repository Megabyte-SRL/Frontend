import { Box, Toolbar, List, ListItem, ListItemText, Paper, Grid, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import ReservaLayout from '../layout/ReservaLayout';

const NuevoAmbiente = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ReservaLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
        <Box
            sx={{
    
              display: 'center',
              justifyContent: 'center',
              marginTop: matches ? '10%' : '10%', // Ajustar el marginTop en pantallas pequeñas
              background: 'black',
              minHeight: 'calc(100vh - 20px)', // Calcula la altura mínima para ajustarse a la pantalla
            }}
          >
            <Paper sx={{
              marginTop:'-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', // Ajusta el sombreado para el marco
              padding: '2%',
              width: '100%',
              maxWidth: 'auto',
              backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
            }}>
              <Typography variant="h5" align="center" gutterBottom>
                REGISTRO DE AMBIENTES
              </Typography>
              <form>
                
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Typography variant="body1">Identificador de ambiente:</Typography>
                <TextField label="Ingrese identificador de ambiente" variant="outlined" style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Typography variant="body1">Capacidad de ambiente:</Typography>
                <TextField label="Ingrese capacidad de ambiente" type="number" variant="outlined" style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Typography variant="body1">Accesibilidad:</Typography>
                <RadioGroup aria-label="accesibilidad" name="accesibilidad">
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Typography variant="body1" sx={{ marginRight: '1rem' }}>Descripcion de ambiente:</Typography>
                  <TextField label="Ingrese descripción de ambiente" multiline rows={4} variant="outlined" style={{ width: '100%' }} />
                  
              </div>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant="contained" color="primary">
                      Guardar
                    </Button>
                    <Button variant="contained" color="secondary">
                      Cancelar
                    </Button>
              </Box>

                
              </form>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </ReservaLayout>
  );
};

export default NuevoAmbiente;
