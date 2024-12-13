import { Router } from "express";
import { getTipoDeDepreciaciones, getTipoDeDepreciacion, createTipoDeDepreciacion, updateTipoDeDepreciacion, deleteTipoDeDepreciacion } from "../controllers/tipoDepreciacion.controllers.js";

const router = Router();

router.get("/tipoDeDepreciaciones", getTipoDeDepreciaciones);
router.get("/tipoDeDepreciacion/:id", getTipoDeDepreciacion);
router.post("/tipoDeDepreciacion", createTipoDeDepreciacion);
router.put("/tipoDeDepreciacion/:id", updateTipoDeDepreciacion);
router.delete("/tipoDeDepreciacion/:id", deleteTipoDeDepreciacion);


export default router;