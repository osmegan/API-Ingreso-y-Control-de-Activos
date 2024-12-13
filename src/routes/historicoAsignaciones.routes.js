import {Router} from 'express'
import {  getHistoricoAsignaciones, getHistoricoAsignacion, createHistoricoAsignacion, updateHistoricoAsignacion, deleteHistoricoAsignacion } from '../controllers/historicoAsignaciones.controllers.js';

const router = Router()

router.get('/historicoAsignaciones', getHistoricoAsignaciones);
router.get("/historicoAsignacion/:id", getHistoricoAsignacion);
router.post("/historicoAsignacion", createHistoricoAsignacion);
router.put("/historicoAsignacion/:id", updateHistoricoAsignacion);
router.delete("/historicoAsignacion/:id", deleteHistoricoAsignacion);

export default router