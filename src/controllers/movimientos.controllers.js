import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS MOVIMIENTOS*/
export const getMovimientos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Movimientos');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO MOVIMIENTO*/
export const getMovimiento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Movimiento", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.Movimientos WHERE ID_Movimiento = @ID_Movimiento"
      );

    if (result.recordset.length === 0) { // CORREGIDO: Usar `result.recordset.length` en lugar de `result.rowsAffected[0]`
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el movimiento");
  }
};

/*FUNCION PARA CREAR UN MOVIMIENTO*/
export const createMovimiento = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Movimiento), 0) + 1 AS nextId FROM GestionActivos.Movimientos"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Movimiento", sql.Int, nextId)
      .input("FechaMovimiento", sql.Date, req.body.FechaMovimiento)
      .input("Descripcion", sql.VarChar, req.body.Descripcion)
      .input("ID_Activo", sql.Int, req.body.ID_Activo)
      .input("ID_UbicacionOrigen", sql.Int, req.body.ID_UbicacionOrigen) 
      .input("ID_UbicacionDestino", sql.Int, req.body.ID_UbicacionDestino)
      .query(
        "INSERT INTO GestionActivos.Movimientos (ID_Movimiento, FechaMovimiento, Descripcion, ID_Activo, ID_UbicacionOrigen, ID_UbicacionDestino) VALUES (@ID_Movimiento, @FechaMovimiento, @Descripcion, @ID_Activo, @ID_UbicacionOrigen, @ID_UbicacionDestino)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Movimiento: nextId,
      FechaMovimiento: req.body.FechaMovimiento,
      Descripcion: req.body.Descripcion,
      ID_Activo: req.body.ID_Activo,
      ID_UbicacionOrigen: req.body.ID_UbicacionOrigen,
      ID_UbicacionDestino: req.body.ID_UbicacionDestino, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el movimiento");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN MOVIMIENTO*/
export const updateMovimiento = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Movimiento", sql.Int, id) 
      .input("FechaMovimiento", sql.Date, req.body.FechaMovimiento)
      .input("Descripcion", sql.VarChar, req.body.Descripcion)
      .input("ID_Activo", sql.Int, req.body.ID_Activo)
      .input("ID_UbicacionOrigen", sql.Int, req.body.ID_UbicacionOrigen)
      .input("ID_UbicacionDestino", sql.Int, req.body.ID_UbicacionDestino)
      .query(
        "UPDATE GestionActivos.Movimientos SET FechaMovimiento = @FechaMovimiento, Descripcion = @Descripcion, ID_Activo = @ID_Activo, ID_UbicacionOrigen = @ID_UbicacionOrigen, ID_UbicacionDestino = @ID_UbicacionDestino WHERE ID_Movimiento = @ID_Movimiento"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }

    res.json({
      ID_Movimiento: id, 
      FechaMovimiento: req.body.FechaMovimiento,
      Descripcion: req.body.Descripcion,
      ID_Activo: req.body.ID_Activo,
      ID_UbicacionOrigen: req.body.ID_UbicacionOrigen,
      ID_UbicacionDestino: req.body.ID_UbicacionDestino,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el movimiento");
  }
};

/*FUNCION PARA ELIMINAR UN MOVIMIENTO */
export const deleteMovimiento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Movimiento", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.Movimientos WHERE ID_Movimiento = @ID_Movimiento"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }

    return res.json({ message: "Movimiento eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el movimiento");
  }
};



