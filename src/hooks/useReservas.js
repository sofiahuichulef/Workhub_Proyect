import { useState, useEffect } from 'react'
import { getReservas, crearReserva, cancelarReserva } from '../services/espaciosService'

export function useReservas() {
  const [reservas, setReservas]   = useState([])
  const [cargando, setCargando]   = useState(true)
  const [error, setError]         = useState(null)

  // Carga inicial de reservas (useEffect)
  useEffect(() => {
    const cargarReservas = async () => {
      try {
        setCargando(true)
        const data = await getReservas()
        setReservas(data)
      } catch (err) {
        setError('Error al cargar reservas: ' + err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarReservas()
  }, [])

  // Agregar nueva reserva
  const agregarReserva = async (datosReserva) => {
    try {
      const nueva = await crearReserva(datosReserva)
      setReservas(prev => [...prev, nueva])
      return { success: true }
    } catch (err) {
      setError('Error al crear reserva: ' + err.message)
      return { success: false }
    }
  }

  // Eliminar reserva por id
  const eliminarReserva = async (id) => {
    try {
      await cancelarReserva(id)
      setReservas(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      setError('Error al cancelar reserva: ' + err.message)
    }
  }

  return {
    reservas,
    cargando,
    error,
    agregarReserva,
    eliminarReserva
  }
}