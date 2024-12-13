import {Router} from 'express'
import { getProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../controllers/proveedor.controllers.js';

const router = Router()

router.get('/proveedores', getProveedores);
router.get("/proveedor/:id", getProveedor);
router.post("/proveedor", createProveedor);
router.put("/proveedor/:id", updateProveedor);
router.delete("/proveedor/:id", deleteProveedor);

export default router 