import { Box, Typography, TextField, Container, Button, Alert } from '@mui/material'
import { useState, useEffect } from 'react'
import { Visualizacion } from './Visualizacion'
import ReservaLayout from '../layout/ReservaLayout'

const HabilitarFechaPage = () => {
    const [error, setError] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [periodoActivo, setPeriodoActivo] = useState(false)
    const [periodoInscripcion, setPeriodoInscripcion] = useState('')

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    useEffect(() => {
        const savedPeriodoInscripcion = localStorage.getItem('periodoInscripcion')
        if (savedPeriodoInscripcion) {
            setPeriodoInscripcion(savedPeriodoInscripcion)
            setPeriodoActivo(true)
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!fechaInicio || !fechaFin) {
            setError('Debe ingresar ambas fechas.')
            return
        }

        const fechaInicioDate = new Date(fechaInicio)
        const fechaFinDate = new Date(fechaFin)
        const fechaActual = new Date()

        if (fechaInicioDate < fechaActual) {
            setError('La fecha de inicio no puede ser anterior a la fecha actual.')
            return
        }

        if (fechaFinDate < fechaInicioDate) {
            setError('La fecha fin no puede ser anterior a la fecha de inicio.')
            return
        }

        setError('')

        const inicioFormatted = addDays(fechaInicioDate, 1).toLocaleDateString()
        const finFormatted = addDays(fechaFinDate, 1).toLocaleDateString()
        const periodoInscripcionText = `Período de inscripción: ${inicioFormatted} hasta ${finFormatted}`
        setPeriodoInscripcion(periodoInscripcionText)
        setPeriodoActivo(true)
        localStorage.setItem('periodoInscripcion', periodoInscripcionText)
    }

    const addDays = (date, days) => {
        const result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }

    const handleDesactivar = () => {
        localStorage.removeItem('periodoInscripcion')
        setPeriodoInscripcion('')
        setPeriodoActivo(false)
    }

    return (
        <ReservaLayout>
            <Container component="main" maxWidth="xm">
                <Box
                    sx={{
                        marginTop: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: 'white',
                        padding: '5rem',
                        height: '100vh',
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        FECHAS DE INSCRIPCION
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 600 }}>
                        <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Fecha Inicio:</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fechaInicio"
                            type="date"
                            name="fechaInicio"
                            autoComplete="fechaInicio"
                            autoFocus
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                        <Typography variant="body1" sx={{ marginRight: '1rem', marginLeft: '5%' }}>Fecha Fin:</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fechaFin"
                            type="date"
                            name="fechaFin"
                            autoComplete="fechaFin"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                        {error && <Alert severity="error">{error}</Alert>}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {!periodoInscripcion && (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ width: 200, marginTop: '1rem' }}
                                >
                                    Habilitar
                                </Button>
                            )}
                            {periodoInscripcion && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleDesactivar}
                                    sx={{ width: 200, marginTop: '1rem' }}
                                >
                                    Deshabilitar
                                </Button>
                            )}
                        </Box>

                        {periodoInscripcion && (
                            <Box
                                sx={{
                                    border: '2px solid #7ac4a6',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    marginTop: '20px',
                                }}
                            >
                                <Typography variant="body1">{periodoInscripcion}</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
            <Visualizacion />
        </ReservaLayout>
    )
}

export default HabilitarFechaPage
