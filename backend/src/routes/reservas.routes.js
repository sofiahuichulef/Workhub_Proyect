import express from 'express';
import { getAll } from "../models/reservaModel.js";
import { crearReserva, eliminarReserva, actualizarReserva } from '../controllers/reservasController.js'; // 👈 agrega crearReserva

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getAll());
});


router.post('/', crearReserva);

router.delete('/:id', eliminarReserva);
router.put('/:id', actualizarReserva);

export default router;