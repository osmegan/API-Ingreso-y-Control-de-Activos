import { Router } from 'express';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.controllers.js';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get("/usuario/:id", getUsuario);
router.post("/usuario", createUsuario);
router.put("/usuario/:id", updateUsuario);
router.delete("/usuario/:id", deleteUsuario);

export default router;