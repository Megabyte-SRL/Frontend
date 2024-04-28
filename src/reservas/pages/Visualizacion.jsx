// TODO: COMPONENTE TEST VISUALIZACION PARA VER SI GUARDA EL ESTADO DE INSCRIPCION

import { useState, useEffect } from 'react'

export const Visualizacion = () => {
    const [periodoActivo, setPeriodoActivo] = useState(false)

    useEffect(() => {
        const savedPeriodoInscripcion = localStorage.getItem('periodoInscripcion')
        if (savedPeriodoInscripcion) {
            setPeriodoActivo(true)
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
