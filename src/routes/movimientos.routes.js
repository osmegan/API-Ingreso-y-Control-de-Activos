import {Router} from 'express'
import { getMovimientos, getMovimiento, createMovimiento, updateMovimiento, deleteMovimiento } from '../controllers/movimientos.controllers.js';

const router = Router()

router.get('/movimientos', getMovimientos);
router.get("/movimiento/:id", getMovimiento);
router.post("/movimiento", createMovimiento);
router.put("/movimiento/:id", updateMovimiento);
router.delete("/movimiento/:id", deleteMovimiento);

export default router