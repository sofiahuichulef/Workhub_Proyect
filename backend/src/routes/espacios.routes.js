import { Router } from 'express'
import { getEspacios } from '../controllers/espaciosController.js'

const router = Router()

// GET /espacios
router.get('/', getEspacios)

export default router
 
module.exports = router
 