import {Router} from 'express'
import { getColorActivos, getColorActivo, createColorActivo, updateColorActivo, deleteColorActivo} from '../controllers/color.controllers.js';

const router = Router()

router.get('/colorActivos', getColorActivos);
router.get('/colorActivo/:id', getColorActivo);
router.post("/colorActivo", createColorActivo);
router.put("/colorActivo/:id", updateColorActivo);
router.delete("/colorActivo/:id", deleteColorActivo);

export default router 