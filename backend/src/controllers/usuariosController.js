import mongoose from 'mongoose';
import Usuario from '../models/usuarioModel.js';

/**
 * GET /usuarios — lista todos los usuarios
 */
export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /usuarios/:id — devuelve un usuario por id
 */
export const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /usuarios — crea un nuevo usuario
 */
export const crearUsuario = async (req, res, next) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Datos inválidos',
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }
    // Email duplicado (índice único)
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Ya existe un usuario registrado con ese email',
      });
    }
    next(error);
  }
};

/**
 * PUT /usuarios/:id — actualiza un usuario
 */
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Datos inválidos',
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Ya existe un usuario registrado con ese email',
      });
    }
    next(error);
  }
};

/**
 * DELETE /usuarios/:id — elimina un usuario
 */
export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
