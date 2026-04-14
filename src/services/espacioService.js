import espaciosData from '../data/espacios.json'
import reservasData from '../data/reservas.json'

// Simula delay de red
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// ─── ESPACIOS ─────────────────────────────────────────────────────────────────

export const getEspacios = async () => {
  await delay()
  return espaciosData
}

export const getEspacioById = async (id) => {
  await delay()
  const espacio = espaciosData.find(e => e.id === Number(id))
  if (!espacio) throw new Error(`Espacio con id ${id} no encontrado`)
  return espacio
}

export const getEspaciosByTipo = async (tipo) => {
  await delay()
  if (tipo === 'todos') return espaciosData
  return espaciosData.filter(e => e.tipo === tipo)
}

// ─── RESERVAS ─────────────────────────────────────────────────────────────────

export const getReservas = async () => {
  await delay()
  return reservasData
}

export const crearReserva = async (nuevaReserva) => {
  await delay(500)
  // En producción esto sería un POST al servidor
  const reservaConId = {
    id: Date.now(),
    estado: 'pendiente',
    ...nuevaReserva
  }
  return reservaConId
}

export const cancelarReserva = async (id) => {
  await delay()
  // En producción sería un DELETE o PATCH
  return { success: true, id }
}