import {Router} from 'express'
import { getMarcaActivos, getMarcaActivo, createMarcaActivo, updateMarcaActivo, deleteMarcaActivo } from '../controllers/marcaActivo.controllers.js';

const router = Router()

router.get('/marcaActivos', getMarcaActivos);
router.get("/marcaActivo/:id", getMarcaActivo);
router.post("/marcaActivo", createMarcaActivo);
router.put("/marcaActivo/:id", updateMarcaActivo);
router.delete("/marcaActivo/:id", deleteMarcaActivo);

export default router 