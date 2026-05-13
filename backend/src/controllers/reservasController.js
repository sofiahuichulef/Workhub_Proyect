import mongoose from 'mongoose';
import Reserva from '../models/reservaModel.js';
import Usuario from '../models/usuarioModel.js';
import Espacio from '../models/espacioModel.js';

// Campos que se traen al hacer populate (evita devolver datos innecesarios)
const POPULATE_USUARIO = { path: 'usuario', select: 'nombre email telefono rol' };
const POPULATE_ESPACIO = { path: 'espacio', select: 'nombre tipo capacidad precio imagen disponible' };

/**
 * GET /reservas — lista todas las reservas (con datos de usuario y espacio embebidos)
 */
export const getReservas = async (req, res, next) => {
  try {
    const reservas = await Reserva.find()
      .populate(POPULATE_USUARIO)
      .populate(POPULATE_ESPACIO)
      .sort({ fecha: -1, horaInicio: -1 });

    res.status(200).json(reservas);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /reservas/:id — devuelve una reserva por id (con populate)
 */
export const getReservaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de reserva inválido' });
    }

    const reserva = await Reserva.findById(id)
      .populate(POPULATE_USUARIO)
      .populate(POPULATE_ESPACIO);

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json(reserva);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /reservas — crea una nueva reserva
 * Acepta dos formas de identificar al usuario:
 *   1) usuario: <ObjectId>  → usuario ya registrado
 *   2) email + nombre       → crea o busca al usuario automáticamente
 */
export const crearReserva = async (req, res, next) => {
  try {
    const { usuario, espacio, email, nombre, fecha, horaInicio, horaFin, notas } = req.body;

    // Validar referencia a espacio
    if (!espacio || !mongoose.isValidObjectId(espacio)) {
      return res.status(400).json({ message: 'El campo "espacio" es obligatorio y debe ser un ID válido' });
    }

    const espacioDoc = await Espacio.findById(espacio);
    if (!espacioDoc) {
      return res.status(404).json({ message: 'El espacio indicado no existe' });
    }

    // Resolver usuario: por id directo o creando/encontrando por email
    let usuarioId = usuario;

    if (!usuarioId) {
      if (!email || !nombre) {
        return res.status(400).json({
          message: 'Debe enviar "usuario" (id) o bien "email" y "nombre" para registrar al cliente',
        });
      }

      const emailNormalizado = String(email).trim().toLowerCase();
      let usuarioDoc = await Usuario.findOne({ email: emailNormalizado });
      if (!usuarioDoc) {
        usuarioDoc = await Usuario.create({ nombre, email: emailNormalizado });
      }
      usuarioId = usuarioDoc._id;
    } else if (!mongoose.isValidObjectId(usuarioId)) {
      return res.status(400).json({ message: 'El campo "usuario" debe ser un ID válido' });
    } else {
      const existe = await Usuario.findById(usuarioId);
      if (!existe) {
        return res.status(404).json({ message: 'El usuario indicado no existe' });
      }
    }

    const nuevaReserva = await Reserva.create({
      usuario: usuarioId,
      espacio,
      fecha,
      horaInicio,
      horaFin,
      notas,
    });

    // Devolver la reserva ya con populate aplicado
    const reservaPopulada = await Reserva.findById(nuevaReserva._id)
      .populate(POPULATE_USUARIO)
      .populate(POPULATE_ESPACIO);

    res.status(201).json(reservaPopulada);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Datos inválidos',
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }
    next(error);
  }
};

/**
 * PUT /reservas/:id — actualiza una reserva existente
 */
export const actualizarReserva = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de reserva inválido' });
    }

    const reserva = await Reserva.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate(POPULATE_USUARIO)
      .populate(POPULATE_ESPACIO);

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json(reserva);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Datos inválidos',
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }
    next(error);
  }
};

/**
 * DELETE /reservas/:id — elimina una reserva
 */
export const eliminarReserva = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de reserva inválido' });
    }

    const reserva = await Reserva.findByIdAndDelete(id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};
