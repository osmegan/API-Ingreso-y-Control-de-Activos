import express from 'express'
import activosRoutes from './routes/activos.routes.js'
import userRoutes from './routes/usuarios.routes.js'
import asignacionesRoutes from './routes/asignaciones.routes.js'
import colorRoutes from './routes/color.routes.js'
import departamentoRoutes from './routes/departamento.routes.js'
import depreciacionRoutes from './routes/depreciacion.routes.js'
import historicoAsignaciones from './routes/historicoAsignaciones.routes.js'
import marcaActivos from './routes/marcaActivos.routes.js'
import movimientos from './routes/movimientos.routes.js'
import pabellon from './routes/pabellon.routes.js'
import proveedor from './routes/proveedor.routes.js'
import tipoActivo from './routes/tipoActivo.routes.js'
import tipoRol from './routes/tipoRol.routes.js'
import garantias from './routes/garantias.routes.js'
import ubicaciones from './routes/ubicaciones.routes.js'
import tipoDeprecion from './routes/tipoDepreciacion.routes.js'

const app = express();

app.use(express.json());

app.use(activosRoutes);
app.use(userRoutes);
app.use(asignacionesRoutes);
app.use(colorRoutes);
app.use(departamentoRoutes);
app.use(depreciacionRoutes);
app.use (historicoAsignaciones);
app.use(marcaActivos);
app.use (movimientos);
app.use(pabellon);
app.use(proveedor);
app.use(tipoActivo);
app.use(tipoRol);
app.use(garantias);
app.use(ubicaciones);
app.use(tipoDeprecion);


export default app