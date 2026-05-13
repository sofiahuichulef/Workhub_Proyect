/**
 * Script de seed: pobla la base de datos con datos iniciales.
 * Uso: npm run seed
 *
 * - Borra y vuelve a crear los espacios del catálogo.
 * - Crea un usuario de ejemplo.
 * - Crea una reserva de demostración referenciando ambos modelos.
 */
import 'dotenv/config';
import mongoose from 'mongoose';

import connectDB from './config/db.js';
import Espacio from './models/espacioModel.js';
import Usuario from './models/usuarioModel.js';
import Reserva from './models/reservaModel.js';

const espaciosSeed = [
  {
    nombre: 'Room A - Reunion room',
    tipo: 'sala_reunion',
    capacidad: 8,
    precio: 15000,
    descripcion: 'Sala equipada con proyector, pizarrón y conexión HDMI.',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
  },
  {
    nombre: 'Desk 1 - Individual Space',
    tipo: 'escritorio',
    capacidad: 1,
    precio: 8000,
    descripcion: 'Escritorio individual con casillero y acceso a impresora.',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400',
  },
  {
    nombre: 'Premium Office',
    tipo: 'oficina',
    capacidad: 4,
    precio: 25000,
    descripcion: 'Oficina cerrada con aire acondicionado y vista panorámica.',
    disponible: false,
    imagen: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400',
  },
  {
    nombre: 'Common Workhub Area',
    tipo: 'open_space',
    capacidad: 20,
    precio: 5000,
    descripcion: 'Área abierta con sofás, mesas altas y ambiente relajado.',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
  },
  {
    nombre: 'Room B - Conference Room',
    tipo: 'sala_reunion',
    capacidad: 20,
    precio: 35000,
    descripcion: 'Sala formal con videoconferencia, micrófonos y café incluido.',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400',
  },
  {
    nombre: 'Desk 2 - Hot Desk',
    tipo: 'escritorio',
    capacidad: 1,
    precio: 8000,
    descripcion: 'Escritorio individual cerca de ventana con luz natural.',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
  },
  {
    nombre: 'Executive Office - C',
    tipo: 'oficina',
    capacidad: 3,
    precio: 18000,
    descripcion: 'Oficina privada con escritorios para equipo pequeño.',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400',
  },
  {
    nombre: 'Room F - Creative Space',
    tipo: 'sala_reunion',
    capacidad: 6,
    precio: 12000,
    descripcion: 'Sala informal con mesas modulares y pared de vidrio.',
    disponible: false,
    imagen: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400',
  },
];

const seed = async () => {
  try {
    await connectDB();

    console.log('🧹 Limpiando colecciones...');
    await Promise.all([
      Espacio.deleteMany({}),
      Usuario.deleteMany({}),
      Reserva.deleteMany({}),
    ]);

    console.log('📦 Insertando espacios...');
    const espacios = await Espacio.insertMany(espaciosSeed);

    console.log('👤 Insertando usuario de ejemplo...');
    const usuario = await Usuario.create({
      nombre: 'Ana Martínez',
      email: 'ana@email.com',
      telefono: '+56 9 1234 5678',
      rol: 'cliente',
    });

    console.log('📅 Insertando reserva de ejemplo...');
    await Reserva.create({
      usuario: usuario._id,
      espacio: espacios[0]._id,
      fecha: new Date('2026-05-20'),
      horaInicio: '09:00',
      horaFin: '11:00',
      estado: 'confirmada',
      notas: 'Reunión inicial con cliente',
    });

    console.log('✅ Seed completado correctamente');
    console.log(`   - ${espacios.length} espacios`);
    console.log('   - 1 usuario');
    console.log('   - 1 reserva');
  } catch (error) {
    console.error('❌ Error en el seed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
