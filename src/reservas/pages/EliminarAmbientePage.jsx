import { Box, Paper, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { DeleteTable } from '../components';
import { Search as SearchIcon } from '@mui/icons-material'
import ReservaLayout from '../layout/ReservaLayout'


const datos = [
    { fecha: '2022-03-28', nombreAmbiente: 'Aula 101', capacidad: 30, descripcion: 'Aula de teoría' },
    { fecha: '2022-03-29', nombreAmbiente: 'Laboratorio 201', capacidad: 20, descripcion: 'Laboratorio de química' },
    { fecha: '2022-03-30', nombreAmbiente: 'Aula 101', capacidad: 30, descripcion: 'Aula de física' },
    { fecha: '2022-04-01', nombreAmbiente: 'Sala de Conferencias 301', capacidad: 50, descripcion: 'Sala para presentaciones' },
    { fecha: '2022-04-02', nombreAmbiente: 'Auditorio 401', capacidad: 100, descripcion: 'Auditorio principal' },
    { fecha: '2022-04-05', nombreAmbiente: 'Laboratorio 202', capacidad: 25, descripcion: 'Laboratorio de biología' },
    { fecha: '2022-04-06', nombreAmbiente: 'Aula 102', capacidad: 35, descripcion: 'Aula de matemáticas' },
]

const EliminarAmbientePage = () => {
    return (
        <ReservaLayout>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10%',
                            background: 'black',
                            minHeight: 'calc(100vh - 20px)',
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

                            <DeleteTable datos={datos} />
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </ReservaLayout>
    );
};

export default EliminarAmbientePage