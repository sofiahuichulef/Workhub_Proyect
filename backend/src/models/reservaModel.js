import { v4 as uuidv4 } from 'uuid';

let reservas = [
  {
    id: "1",
    espacioId: 1,
    espacioNombre: "Sala Creativa A",
    usuario: "Ana Martínez",
    email: "ana@email.com",
    fecha: "2025-04-10",
    horaInicio: "09:00",
    horaFin: "11:00",
    estado: "confirmada"
  },
  {
    id: "2",
    espacioId: 4,
    espacioNombre: "Zona Colaborativa",
    usuario: "Carlos López",
    email: "carlos@email.com",
    fecha: "2025-04-11",
    horaInicio: "14:00",
    horaFin: "18:00",
    estado: "pendiente"
  },
  {
    id: "3",
    espacioId: 2,
    espacioNombre: "Escritorio Privado 1",
    usuario: "Sofía Ruiz",
    email: "sofia@email.com",
    fecha: "2025-04-12",
    horaInicio: "08:00",
    horaFin: "17:00",
    estado: "confirmada"
  },
  {
    id: "4",
    espacioId: 5,
    espacioNombre: "Sala de Conferencias",
    usuario: "Diego Herrera",
    email: "diego@email.com",
    fecha: "2025-04-14",
    horaInicio: "10:00",
    horaFin: "12:00",
    estado: "pendiente"
  },
  {
    id: "5",
    espacioId: 7,
    espacioNombre: "Oficina Estándar B",
    usuario: "Valentina Torres",
    email: "vale@email.com",
    fecha: "2025-04-15",
    horaInicio: "09:00",
    horaFin: "18:00",
    estado: "confirmada"
  },
  {
    id: "6",
    espacioId: 2,
    espacioNombre: "Escritorio Privado 1",
    usuario: "Matías Soto",
    email: "matias@email.com",
    fecha: "2025-04-16",
    horaInicio: "13:00",
    horaFin: "17:00",
    estado: "cancelada"
  }
];

export function getAll() {
  return reservas;
}

export function getById(id) {
  return reservas.find((r) => r.id === String(id)) || null;
}

export function create(data) {
  const nuevaReserva = {
    id: uuidv4(),
    espacioId: data.espacioId,
    espacioNombre: data.espacioNombre,
    usuario: data.usuario,
    email: data.email,
    fecha: data.fecha,
    horaInicio: data.horaInicio,
    horaFin: data.horaFin,
    estado: 'pendiente'
  };
  reservas.push(nuevaReserva);
  return nuevaReserva;
}

export function update(id, data) {
  const index = reservas.findIndex((r) => r.id === String(id));
  if (index === -1) return null;

  reservas[index] = { ...reservas[index], ...data, id: String(id) };
  return reservas[index];
}

export function remove(id) {
  const index = reservas.findIndex((r) => r.id === String(id));
  if (index === -1) return false;

  reservas.splice(index, 1);
  return true;
}