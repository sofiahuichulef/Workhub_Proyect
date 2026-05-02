import { body, validationResult } from 'express-validator';

const validateReserva = [
  body('espacioId')
    .isInt({ gt: 0 })
    .withMessage('espacioId debe ser un entero positivo'),
  body('usuario')
    .trim()
    .notEmpty()
    .withMessage('usuario no puede estar vacío'),
  body('email')
    .isEmail()
    .withMessage('email debe tener un formato válido'),
  body('fecha')
    .trim()
    .notEmpty()
    .withMessage('fecha no puede estar vacía'),
  body('horaInicio')
    .trim()
    .notEmpty()
    .withMessage('horaInicio no puede estar vacía'),
  body('horaFin')
    .trim()
    .notEmpty()
    .withMessage('horaFin no puede estar vacía'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    return next();
  },
];

export default validateReserva;

