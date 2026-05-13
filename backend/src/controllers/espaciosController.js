import mongoose from 'mongoose';
import Espacio from '../models/espacioModel.js';

/**
 * GET /espacios — lista todos los espacios
 */
export const getEspacios = async (req, res, next) => {
  try {
    const espacios = await Espacio.find().sort({ createdAt: 1 });
    res.status(200).json(espacios);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /espacios/:id — devuelve un espacio por id
 */
export const getEspacioById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de espacio inválido' });
    }

    const espacio = await Espacio.findById(id);
    if (!espacio) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }

    res.status(200).json(espacio);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /espacios — crea un nuevo espacio
 */
export const crearEspacio = async (req, res, next) => {
  try {
    const nuevo = await Espacio.create(req.body);
    res.status(201).json(nuevo);
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
 * PUT /espacios/:id — actualiza un espacio
 */
export const actualizarEspacio = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de espacio inválido' });
    }

    const espacio = await Espacio.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!espacio) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }

    res.status(200).json(espacio);
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
 * DELETE /espacios/:id — elimina un espacio
 */
export const eliminarEspacio = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de espacio inválido' });
    }

    const espacio = await Espacio.findByIdAndDelete(id);
    if (!espacio) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }

    res.status(200).json({ message: 'Espacio eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
