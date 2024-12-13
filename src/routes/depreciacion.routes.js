import { Router } from "express";
import { getDepreciacion, getDepreciacionActivo, createDepreciacion, updateDepreciacion, deleteDepreciacion } from "../controllers/depreciacion.controllers.js";

const router = Router();

router.get("/depreciacionActivos", getDepreciacion);
router.get("/depreciacionActivo/:id", getDepreciacionActivo);
router.post("/depreciacion", createDepreciacion);
router.put("/depreciacion/:id", updateDepreciacion);
router.delete("/depreciacion/:id", deleteDepreciacion);


export default router;
