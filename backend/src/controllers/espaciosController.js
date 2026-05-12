import { getAll } from '../models/espacioModel.js';

// GET /espacios → retorna todos los espacios
export const getEspacios = async (req, res, next) => {
  try {
    const data = await getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const getEspacioById = (req, res) => {
  const id = Number(req.params.id)

  const espacio = espacios.find((e) => e.id === id)

  if (!espacio) {
    return res.status(404).json({
      message: 'Espacio no encontrado'
    })
  }

  res.json(espacio)
}