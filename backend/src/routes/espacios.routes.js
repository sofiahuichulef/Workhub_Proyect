import { Router } from 'express';
import {
  getEspacios,
  getEspacioById,
  crearEspacio,
  actualizarEspacio,
  eliminarEspacio,
} from '../controllers/espaciosController.js';

const router = Router();

router.get('/', getEspacios);
router.get('/:id', getEspacioById);
router.post('/', crearEspacio);
router.put('/:id', actualizarEspacio);
router.delete('/:id', eliminarEspacio);

export default router;
