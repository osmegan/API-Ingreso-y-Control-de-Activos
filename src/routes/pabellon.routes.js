import {Router} from 'express'
import { getPabellones, getPabellon, createPabellon, updatePabellon, deletePabellon } from '../controllers/pabellon.controllers.js';

const router = Router()

router.get('/pabellones', getPabellones);
router.get("/pabellon/:id", getPabellon);
router.post("/pabellon", createPabellon);
router.put("/pabellon/:id", updatePabellon);
router.delete("/pabellon/:id", deletePabellon);

export default router 