import { getAll, getById, remove, update, create } from "../models/reservaModel.js";

// GET /reservas → retorna todas las reservas
export const getReservas = async (req, res, next) => {
  try {
    const reservas = getAll(); 
    res.status(200).json(reservas);
  } catch (error) {
    next(error);
  }
};

// POST /reservas → crea una nueva reserva
export const crearReserva = async (req, res, next) => {
  try {
    const { espacioId, espacioNombre, usuario, email, fecha, horaInicio, horaFin } = req.body;

    if (!espacioId || !espacioNombre || !usuario || !email || !fecha || !horaInicio || !horaFin) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios en el body del POST',
      });
    }

    const nuevaReserva = create({ 
      espacioId, espacioNombre, usuario, email, fecha, horaInicio, horaFin,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    next(error);
  }
};

export const eliminarReserva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reserva = getById(id);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    remove(id);
    res.status(200).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

export const actualizarReserva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const reserva = getById(id);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    const reservaActualizada = update(id, data);
    res.status(200).json(reservaActualizada);
  } catch (error) {
    next(error);
  }
};