import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODAS LAS ASIGNACIONES*/ 
export const getAsignaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Asignaciones');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLA ASIGNACION*/
export const getAsignacion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Asignacion", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.Asignaciones WHERE ID_Asignacion = @ID_Asignacion"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Activo not found" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UNA ASIGNACION*/ 
export const createAsignacion = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Activo), 0) + 1 AS nextId FROM GestionActivos.Asignaciones"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Asignacion", sql.Int, nextId)
      .input("FechaAsignacion", sql.Date, req.body.FechaAsignacion)
      .input("ID_Activo", sql.Int, req.body.ID_Activo)
      .input("ID_Usuario", sql.Int, req.body.ID_Usuario)
      .query(
        "INSERT INTO GestionActivos.Asignaciones (ID_Asignacion, FechaAsignacion, ID_Activo, ID_Usuario) VALUES (@ID_Asignacion, @FechaAsignacion, @ID_Activo, @ID_Usuario)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Asignacion: nextId,
      FechaAsignacion: req.body.FechaAsignacion,
      ID_Activo: req.body.ID_Activo,
      ID_Usuario: req.body.ID_Usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la asignación");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UNA ASIGNACION*/
export const updateAsignacion = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Asignacion", sql.Int, id)
      .input("FechaAsignacion", sql.Date, req.body.FechaAsignacion)
      .input("ID_Activo", sql.Int, req.body.ID_Activo)
      .input("ID_Usuario", sql.Int, req.body.ID_Usuario)
      .query(
        "UPDATE GestionActivos.Asignaciones SET FechaAsignacion = @FechaAsignacion, ID_Activo = @ID_Activo, ID_Usuario = @ID_Usuario WHERE ID_Asignacion = @ID_Asignacion"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    res.json({
      ID_Asignacion: id,                              
      FechaAsignacion: req.body.FechaAsignacion,
      ID_Activo: req.body.ID_Activo,
      ID_Usuario: req.body.ID_Usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la asignación");
  }
};

/*FUNCION PARA ELIMINAR UNA ASIGNACION */
export const deleteAsignacion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Asignacion", sql.Int, req.params.id)
    .query(
      "DELETE FROM GestionActivos.Asignaciones WHERE ID_Asignacion = @ID_Asignacion"
    );

  console.log(result);

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Asignacion no encontrada" });
  }

  return res.json({ message: "Asignacion eliminada" });
};


