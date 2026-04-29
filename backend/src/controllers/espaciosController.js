import { getAll } from '../models/espacioModel.js'

// GET /espacios → retorna todos los espacios
export const getEspacios = async (req, res, next) => {
  try {
    const data = await getAll()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}
 
module.exports = { getEspacios }