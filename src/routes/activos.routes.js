import { Router } from "express";
import {
  createActivo,
  deleteActivo,
  getActivo,
  getActivos,
  updateActivo,
} from "../controllers/activos.controllers.js";

const router = Router();

router.get("/activos", getActivos);
router.get("/activo/:id", getActivo);
router.post("/activo", createActivo);
router.put("/activo/:id", updateActivo);
router.delete("/activo/:id", deleteActivo);

export default router;
