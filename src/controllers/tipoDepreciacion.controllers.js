import { getConnection } from "../database/connection.js";
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS TIPOS DE DEPRECIACION*/
export const getTipoDeDepreciaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query("SELECT * FROM GestionActivos.TipoDepreciacion");
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO TIPO DE DEPRECIACION*/
export const getTipoDeDepreciacion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_TipoDepreciacion", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.TipoDepreciacion WHERE ID_TipoDepreciacion = @ID_TipoDepreciacion"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Tipo de depreciacion no encontrada" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el tipo de depreciacion");
  }
};

/*FUNCION PARA CREAR UN TIPO DE DEPRECIACION*/
export const createTipoDeDepreciacion = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_TipoDepreciacion), 0) + 1 AS nextId FROM GestionActivos.TipoDepreciacion"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_TipoDepreciacion", sql.Int, nextId)
      .input("NombreTipoDepreciacion", sql.NVarChar, req.body.NombreTipoDepreciacion)
      .input("Descripcion", sql.NVarChar, req.body.Descripcion) 
      .query(
        "INSERT INTO GestionActivos.TipoDepreciacion (ID_TipoDepreciacion, NombreTipoDepreciacion, Descripcion) VALUES (@ID_TipoDepreciacion, @NombreTipoDepreciacion, @Descripcion)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_TipoDepreciacion: nextId,
      NombreTipoDepreciacion: req.body.NombreTipoDepreciacion,
      Descripcion: req.body.Descripcion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el tipo de depreciación");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN TIPO DE DEPRECIACION*/
export const updateTipoDeDepreciacion = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_TipoDepreciacion", sql.Int, id)
      .input("NombreTipoDepreciacion", sql.NVarChar, req.body.NombreTipoDepreciacion)
      .input("Descripcion", sql.NVarChar, req.body.Descripcion)
      .query(
        "UPDATE GestionActivos.TipoDepreciacion SET NombreTipoDepreciacion = @NombreTipoDepreciacion, Descripcion = @Descripcion WHERE ID_TipoDepreciacion = @ID_TipoDepreciacion"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Tipo de depreciacion no encontrada" });
    }

    res.json({
      ID_TipoDepreciacion: id,
      NombreTipoDepreciacion: req.body.NombreTipoDepreciacion,
      Descripcion: req.body.Descripcion,
      message: "Tipo de depreciacion actualizado correctamente" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el tipo de depreciacion");
  }
};

/*FUNCION PARA ELIMINAR UN TIPO DE DEPRECIACION*/
export const deleteTipoDeDepreciacion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_TipoDepreciacion", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.TipoDepreciacion WHERE ID_TipoDepreciacion = @ID_TipoDepreciacion"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Tipo de depreciacion no encontrado" });
    }

    return res.json({ message: "Tipo de depreciacion eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el tipo de depreciación");
  }
};



