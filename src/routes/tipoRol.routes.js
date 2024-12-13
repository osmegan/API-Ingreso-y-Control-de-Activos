import {Router} from 'express'
import { getTipoRoles, getTipoRol, createTipoRol, updateTipoRol, deleteTipoRol } from '../controllers/tipoRol.controllers.js';

const router = Router()

router.get('/usuarioTipoRoles', getTipoRoles);
router.get("/usuarioTipoRol/:id", getTipoRol);
router.post("/usuarioTipoRol", createTipoRol);
router.put("/usuarioTipoRol/:id", updateTipoRol);
router.delete("/usuarioTipoRol/:id", deleteTipoRol);

export default router