const BASE = import.meta.env.VITE_API_URL

export const getEspacios = async () => {
  const res = await fetch(`${BASE}/espacios`)

  if (!res.ok) {
    throw new Error('Error al obtener espacios')
  }

  const data = await res.json()

  // Transformar backend → frontend
  return data.map((space) => ({
    id: space.id,
    title: space.nombre,
    type:
  space.tipo === 'escritorio'
    ? 'hot-desk'
    : space.tipo === 'oficina'
    ? 'private'
    : space.tipo === 'sala_reunion'
    ? 'meeting'
    : space.tipo === 'open_space'
    ? 'pod'
    : 'other',
    img: space.imagen,
    price: space.precio,
    meta: `${space.capacidad} personas`,
    amenities: [
      space.disponible ? '✅ Disponible' : '❌ No disponible'
    ],
    badge: space.disponible ? 'available' : null
  }))
}
export const getEspacioById = async (id) => {
  const res = await fetch(`${BASE}/espacios/${id}`)

  if (!res.ok) {
    throw new Error('Espacio no encontrado')
  }

  return res.json()
}
export const getEspaciosByTipo = async (tipo) => {
  const espacios = await getEspacios()

  if (tipo === 'todos') {
    return espacios
  }

  return espacios.filter((e) => e.tipo === tipo)
}
// ─── RESERVAS ───────────────────────────────────────────────────────────────

export const getReservas = async () => {
  const res = await fetch(`${BASE}/reservas`)

  if (!res.ok) {
    throw new Error('Error al obtener reservas')
  }

  return res.json()
}
export const crearReserva = async (datos) => {
  const res = await fetch(`${BASE}/reservas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })

  if (!res.ok) {
    throw new Error('Error al crear reserva')
  }

  return res.json()
}
export const cancelarReserva = async (id) => {
  const res = await fetch(`${BASE}/reservas/${id}`, {
    method: 'DELETE'
  })

  if (!res.ok) {
    throw new Error('Error al cancelar reserva')
  }

  return res.json()
}