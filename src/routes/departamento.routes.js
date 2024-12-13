import {Router} from 'express'
import { getDepartamentos, getDepartamento, createDepartamento, updateDepartamento, deleteDepartamento} from '../controllers/departamento.controllers.js';

const router = Router()

router.get('/departamentos', getDepartamentos);
router.get("/departamento/:id", getDepartamento);
router.post("/departamento", createDepartamento);
router.put("/departamento/:id", updateDepartamento);
router.delete("/departamento/:id", deleteDepartamento);

export default router 