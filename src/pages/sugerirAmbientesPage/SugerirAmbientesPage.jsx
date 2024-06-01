import { Box, Grid, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Field, Formik } from 'formik';


const columns = [
    { field: 'id', headerName: 'Id', width: 10 },
    { field: 'fecha', headerName: 'Fecha solicitud', width:180 },
    { field: 'ambiente', headerName: 'Ambiente', width:180 },
    { field: 'horario', headerName: 'Horario', width:180 },
    { field: 'capacidadAmbiente', headerName: 'Capacidad', width:150 },
    { field: 'estado', headerName: 'Estado',width:180 },

];

const rows = [
    { id: 1, fecha: '24-05-12', ambiente: 'Aula 101', horario: '08:00-10:00', capacidadAmbiente: 35, estado: 'disponible' },
    { id: 2, fecha: '24-05-12', ambiente: 'Aula 201', horario: '08:00-10:00', capacidadAmbiente: 42, estado: 'disponible' },
    { id: 3, fecha: '24-05-12', ambiente: 'Aula 301', horario: '08:00-10:00', capacidadAmbiente: 45, estado: 'disponible' },
    { id: 4, fecha: '24-05-12', ambiente: 'Aula 401', horario: '08:00-10:00', capacidadAmbiente: 16, estado: 'disponible' },
    { id: 5, fecha: '24-05-12', ambiente: 'Aula 501', horario: '08:00-10:00', capacidadAmbiente: 205, estado: 'disponible' },
    { id: 6, fecha: '24-05-12', ambiente: 'Aula 601', horario: '08:00-10:00', capacidadAmbiente: 150, estado: 'disponible' },
    { id: 7, fecha: '24-05-12', ambiente: 'Aula 701', horario: '08:00-10:00', capacidadAmbiente: 44, estado: 'disponible' },
    { id: 8, fecha: '24-05-12', ambiente: 'Aula 801', horario: '08:00-10:00', capacidadAmbiente: 36, estado: 'disponible' },
    { id: 9, fecha: '24-05-12', ambiente: 'Aula 901', horario: '08:00-10:00', capacidadAmbiente: 65, estado: 'disponible' },
];

const SugerirAmbientesPage = () => {
    const horas = ['6:45 - 8:15', '8:15 - 9:45', '9:45 - 11:15', '11:15 - 12:45', '12:45 - 14:15', '14:15 - 15:45', '15:45 - 17:15', '17:15 - 18:45', '18:45 - 20:15', '20:15 - 21:45'];

    return (
        <Formik>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={12} lg={90} sx={{ background: '' }}>
                    <Box
                        id='verificar-solicitudes-box'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10%',
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
                                Ambientes disponibles
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={5} sx={{ mt: 2,mb:2 }}>
                                    <Field
                                        as={TextField}
                                        name='fecha'
                                        type='date'
                                        label='Fecha'
                                        variant='outlined'
                                        InputLabelProps={{ shrink: true }}
                                        width='50%'
                                    />
                                </Grid>

                                <Grid item xs={2} sx={{ mt: 2, mb:2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Horas</InputLabel>
                                        <Field
                                            as={Select}
                                            name='hora'
                                            label='Hora'
                                            multiple
                                            value={[]}
                                        >
                                            {horas.map((hora) => (
                                                <MenuItem key={hora} value={hora}>
                                                    {hora}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ mt: 2, mb:5 }}>

                                </Grid>

                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                    fullWidth
                                    
                                />

                                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        type='submit'
                                        color='primary'
                                        variant='contained'
                                    >
                                        Enviar Sugerencia
                                    </Button>
                                    
                                </Grid>
                            </Grid>


                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Formik>








    )
}

export default SugerirAmbientesPage
