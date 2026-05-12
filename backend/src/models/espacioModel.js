const espacios = [
  {
    id: 1,
    nombre: "Room A - Reunion room",
    tipo: "sala_reunion",
    capacidad: 8,
    precio: 15000,
    descripcion: "Sala equipada con proyector, pizarrón y conexión HDMI.",
    disponible: true,
    imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
  },
  {
    id: 2,
    nombre: "Desk 1 - Individual Space",
    tipo: "escritorio",
    capacidad: 1,
    precio: 8000,
    descripcion: "Escritorio individual con casillero y acceso a impresora.",
    disponible: true,
    imagen: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400"
  },
  {
    id: 3,
    nombre: "Premium Office",
    tipo: "oficina",
    capacidad: 4,
    precio: 25000,
    descripcion: "Oficina cerrada con aire acondicionado y vista panorámica.",
    disponible: false,
    imagen: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400"
  },
  {
    id: 4,
    nombre: "Common Workhub Area",
    tipo: "open_space",
    capacidad: 20,
    precio: 5000,
    descripcion: "Área abierta con sofás, mesas altas y ambiente relajado.",
    disponible: true,
    imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400"
  },
  {
    id: 5,
    nombre: "Room B - Conference Room",
    tipo: "sala_reunion",
    capacidad: 20,
    precio: 35000,
    descripcion: "Sala formal con videoconferencia, micrófonos y café incluido.",
    disponible: true,
    imagen: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400"
  },
  {
    id: 6,
    nombre: "Desk 2 - Hot Desk",
    tipo: "escritorio",
    capacidad: 1,
    precio: 8000,
    descripcion: "Escritorio individual cerca de ventana con luz natural.",
    disponible: true,
    imagen: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400"
  },
  {
    id: 7,
    nombre: "Executive Office - C",
    tipo: "oficina",
    capacidad: 3,
    precio: 18000,
    descripcion: "Oficina privada con escritorios para equipo pequeño.",
    disponible: true,
    imagen: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400"
  },
  {
    id: 8,
    nombre: "Room F - Creative Space",
    tipo: "sala_reunion",
    capacidad: 6,
    precio: 12000,
    descripcion: "Sala informal con mesas modulares y pared de vidrio.",
    disponible: false,
    imagen: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400"
  }
];

export function getAll() {
  return espacios;
}

export function getById(id) {
  return espacios.find((e) => e.id === Number(id)) || null;
}