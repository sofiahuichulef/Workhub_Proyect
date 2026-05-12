import { Router } from 'express'

import {
  getEspacios,
  getEspacioById
} from '../controllers/espaciosController.js'

const router = Router()

// GET /espacios
router.get('/', getEspacios)

// GET /espacios/:id
router.get('/:id', getEspacioById)

export default router