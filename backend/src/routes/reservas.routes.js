import { Router } from 'express';
import {
  getReservas,
  getReservaById,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} from '../controllers/reservasController.js';
import validateReserva from '../middlewares/validateReserva.js';

const router = Router();

router.get('/', getReservas);
router.get('/:id', getReservaById);
router.post('/', validateReserva, crearReserva);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);

export default router;
