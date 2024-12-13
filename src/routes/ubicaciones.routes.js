import {Router} from 'express'
import { getUbicaciones, getUbicacion, createUbicacion, updateUbicacion, deleteUbicacion } from '../controllers/ubicaciones.controllers.js';

const router = Router()

router.get('/ubicaciones', getUbicaciones);
router.get("/ubicacion/:id", getUbicacion);
router.post("/ubicacion", createUbicacion);
router.put("/ubicacion/:id", updateUbicacion);
router.delete("/ubicacion/:id", deleteUbicacion);

export default router 