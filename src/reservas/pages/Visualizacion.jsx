// TODO: COMPONENTE TEST VISUALIZACION PARA VER SI GUARDA EL ESTADO DE INSCRIPCION

import { useState, useEffect } from 'react'

export const Visualizacion = () => {
    const [periodoActivo, setPeriodoActivo] = useState(false)

    useEffect(() => {
        const savedPeriodoInscripcion = localStorage.getItem('periodoInscripcion')
        if (savedPeriodoInscripcion) {
            const fechas = savedPeriodoInscripcion.split(',')
            if (fechas.length === 2) {
                const fechaInicio = new Date(fechas[0])
                const fechaFin = new Date(fechas[1])
                const fechaActual = new Date()
                if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
                    setPeriodoActivo(true)
                }
            }
        }
    }, [])

    return (
        // <LayoutDocente>
        <div>
            {periodoActivo ? (
                <h1>Puede inscribir</h1>
            ) : (
                <h1>No puede inscribir</h1>
            )}
        </div>
        // </LayoutDocente >
    )
}


// src / reservas / components / LateralBar.jsx
// src / reservas / pages / HabilitarFechaPage.jsx
// src / reservas / pages / Visualizacion.jsx
// src / reservas / routes / ReservaRoutes.jsx