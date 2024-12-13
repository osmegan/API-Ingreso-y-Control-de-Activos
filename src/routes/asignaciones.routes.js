import {Router} from 'express'
import { getAsignaciones, getAsignacion, createAsignacion, updateAsignacion, deleteAsignacion } from '../controllers/asignaciones.controllers.js';

const router = Router()

router.get('/asignaciones', getAsignaciones);
router.get('/asignacion/:id', getAsignacion);
router.post("/asignacion", createAsignacion);
router.put("/asignacion/:id", updateAsignacion);
router.delete("/asignacion/:id", deleteAsignacion);

export default router 