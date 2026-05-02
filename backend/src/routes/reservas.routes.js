import express from 'express';
import { getAll } from "../models/reservaModel.js";
import { crearReserva, eliminarReserva, actualizarReserva } from '../controllers/reservasController.js'; // 👈 agrega crearReserva
import validateReserva from "../middlewares/validateReserva.js";
const router = express.Router();

router.get('/', (req, res) => {
  res.json(getAll());
});


router.post('/', crearReserva);

router.delete('/:id', eliminarReserva);
router.put('/:id', validateReserva, actualizarReserva);

export default router;