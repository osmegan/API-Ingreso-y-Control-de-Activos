import {Router} from 'express'
import { getTipoActivos, getTipoActivo, createTipoActivo, updateTipoActivo, deleteTipoActivo } from '../controllers/tipoActivo.controllers.js';

const router = Router()

router.get('/tipoActivos', getTipoActivos);
router.get("/tipoActivo/:id", getTipoActivo);
router.post("/tipoActivo", createTipoActivo);
router.put("/tipoActivo/:id", updateTipoActivo);
router.delete("/tipoActivo/:id", deleteTipoActivo);

export default router 