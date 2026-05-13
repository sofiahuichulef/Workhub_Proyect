import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';

/**
 * Validaciones para crear/actualizar una Reserva.
 * Se admite tanto la creación con usuario ya registrado (campo "usuario": ObjectId)
 * como la creación rápida con email + nombre (registra usuario al vuelo).
 */
const validateReserva = [
  body('espacio')
    .exists().withMessage('El campo "espacio" es obligatorio')
    .bail()
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage('El campo "espacio" debe ser un ObjectId válido'),

  body('usuario')
    .optional()
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage('El campo "usuario" debe ser un ObjectId válido'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('El email debe tener un formato válido'),

  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío'),

  body('fecha')
    .exists().withMessage('El campo "fecha" es obligatorio')
    .bail()
    .isISO8601()
    .withMessage('La fecha debe estar en formato ISO 8601 (YYYY-MM-DD)'),

  body('horaInicio')
    .exists().withMessage('El campo "horaInicio" es obligatorio')
    .bail()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('La hora de inicio debe tener el formato HH:MM (24h)'),

  body('horaFin')
    .exists().withMessage('El campo "horaFin" es obligatorio')
    .bail()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('La hora de fin debe tener el formato HH:MM (24h)'),

  body('estado')
    .optional()
    .isIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
    .withMessage('Estado inválido'),

  // Verificación final: el usuario debe identificarse de alguna manera
  (req, res, next) => {
    if (!req.body.usuario && !(req.body.email && req.body.nombre)) {
      return res.status(400).json({
        errors: [{ msg: 'Debe enviar "usuario" (id) o bien "email" y "nombre"' }],
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export default validateReserva;
