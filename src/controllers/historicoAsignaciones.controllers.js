import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODO EL HISTORIAL DE ASIGNACIONES*/
export const getHistoricoAsignaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.HistoricoAsignaciones');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO HISTORIAL DE ASIGNACION*/
export const getHistoricoAsignacion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Historial", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.HistoricoAsignaciones WHERE ID_Historial = @ID_Historial"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Historial de asignacion no encontrado" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UN HISTORIAL DE ASIGNACION*/
export const createHistoricoAsignacion = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Historial), 0) + 1 AS nextId FROM GestionActivos.HistoricoAsignaciones"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Historial", sql.Int, nextId)
      .input("ID_Asignacion", sql.Int, req.body.ID_Asignacion)
      .input("FechaRetiro", sql.Date, req.body.FechaRetiro)
      .query(
        "INSERT INTO GestionActivos.HistoricoAsignaciones (ID_Historial, ID_Asignacion, FechaRetiro) VALUES (@ID_Historial, @ID_Asignacion, @FechaRetiro)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Historial: nextId,
      ID_Asignacion: req.body.ID_Asignacion,
      FechaRetiro: req.body.FechaRetiro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el historial");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN HISTORIAL*/
export const updateHistoricoAsignacion = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Historial", sql.Int, id)
      .input("ID_Asignacion", sql.Int, req.body.ID_Asignacion)
      .input("FechaRetiro", sql.Date, req.body.FechaRetiro)
      .query(
        "UPDATE GestionActivos.HistoricoAsignaciones SET ID_Asignacion = @ID_Asignacion, FechaRetiro = @FechaRetiro WHERE ID_Historial = @ID_Historial"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Historial no encontrado" });
    }

    res.json({
      ID_Historial: id, 
      ID_Asignacion: req.body.ID_Asignacion,
      FechaRetiro: req.body.FechaRetiro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el historial");
  }
};

/*FUNCION PARA ELIMINAR UN ACTIVO */
export const deleteHistoricoAsignacion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Historial", sql.Int, req.params.id)
    .query(
      "DELETE FROM GestionActivos.HistoricoAsignaciones WHERE ID_Historial = @ID_Historial"
    );

  console.log(result);

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Historial no encontrado" });
  }

  return res.json({ message: "Historial eliminado" });
};


