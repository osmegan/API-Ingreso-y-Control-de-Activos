import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODAS LAS GARANTIA*/
export const getGarantias = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Garantias');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLA GARANTIA*/
export const getGarantia = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Garantia", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.Garantias WHERE ID_Garantia = @ID_Garantia"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Garantia no encontrada" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UNA GARANTIA*/
export const createGarantia = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Garantia), 0) + 1 AS nextId FROM GestionActivos.Garantias"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Garantia", sql.Int, nextId)
      .input("GarantiaFechaInicio", sql.Date, req.body.GarantiaFechaInicio)
      .input("GarantiaFechaFin", sql.Date, req.body.GarantiaFechaFin)
      .input("DescripcionGarantia", sql.VarChar, req.body.DescripcionGarantia)
      .query(
        "INSERT INTO GestionActivos.Garantias (ID_Garantia, GarantiaFechaInicio, GarantiaFechaFin, DescripcionGarantia) VALUES (@ID_Garantia, @GarantiaFechaInicio, @GarantiaFechaFin, @DescripcionGarantia)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Garantia: nextId,
      GarantiaFechaInicio: req.body.GarantiaFechaInicio,
      GarantiaFechaFin: req.body.GarantiaFechaFin,
      DescripcionGarantia: req.body.DescripcionGarantia
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear garantia");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UNA GARANTIA*/
export const updateGarantia = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Garantia", sql.Int, id)
      .input("GarantiaFechaInicio", sql.Date, req.body.GarantiaFechaInicio)
      .input("GarantiaFechaFin", sql.Date, req.body.GarantiaFechaFin)
      .input("DescripcionGarantia", sql.VarChar, req.body.DescripcionGarantia)
      .query(
        "UPDATE GestionActivos.Garantias SET GarantiaFechaInicio = @GarantiaFechaInicio, GarantiaFechaFin = @GarantiaFechaFin, DescripcionGarantia = @DescripcionGarantia WHERE ID_Garantia = @ID_Garantia"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Garantia no encontrada" });
    }

    res.json({
      ID_Garantia: id,
      GarantiaFechaInicio: req.body.GarantiaFechaInicio,
      GarantiaFechaFin: req.body.GarantiaFechaFin,
      DescripcionGarantia: req.body.DescripcionGarantia
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la garantia");
  }
};

/*FUNCION PARA ELIMINAR UNA GARANTIA*/
export const deleteGarantia = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Garantia", sql.Int, req.params.id)
    .query(
      "DELETE FROM GestionActivos.Garantias WHERE ID_Garantia = @ID_Garantia"
    );

  console.log(result);

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Garantia no encontrada" });
  }

  return res.json({ message: "Garantia eliminada" });
};
