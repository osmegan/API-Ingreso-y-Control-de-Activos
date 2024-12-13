import {Router} from 'express'
import { getGarantias, getGarantia, createGarantia, updateGarantia, deleteGarantia } from '../controllers/garantias.controllers.js';

const router = Router()

router.get('/garantias', getGarantias);
router.get("/garantia/:id", getGarantia);
router.post("/garantia", createGarantia);
router.put("/garantia/:id", updateGarantia);
router.delete("/garantia/:id", deleteGarantia);

export default router