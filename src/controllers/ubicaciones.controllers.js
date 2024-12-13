import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODAS LAS UBICACIONES*/
export const getUbicaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Ubicaciones');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLA UBICACION*/
export const getUbicacion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Ubicaciones", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.Ubicaciones WHERE ID_Ubicaciones = @ID_Ubicaciones"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Ubicacion no encontrada" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la ubicación");
  }
};

/*FUNCION PARA CREAR UNA UBICACION*/
export const createUbicacion = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Ubicaciones), 0) + 1 AS nextId FROM GestionActivos.Ubicaciones"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Ubicaciones", sql.Int, nextId)
      .input("ID_Pabellon", sql.Int, req.body.ID_Pabellon)
      .input("Aula", sql.NVarChar, req.body.Aula)
      .query(
        "INSERT INTO GestionActivos.Ubicaciones (ID_Ubicaciones, ID_Pabellon, Aula) VALUES (@ID_Ubicaciones, @ID_Pabellon, @Aula)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Ubicaciones: nextId,
      ID_Pabellon: req.body.ID_Pabellon, 
      Aula: req.body.Aula,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la ubicación");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UNA UBICACION*/
export const updateUbicacion = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Ubicaciones", sql.Int, id)
      .input("ID_Pabellon", sql.Int, req.body.ID_Pabellon)
      .input("Aula", sql.NVarChar, req.body.Aula)
      .query(
        "UPDATE GestionActivos.Ubicaciones SET ID_Pabellon = @ID_Pabellon, Aula = @Aula WHERE ID_Ubicaciones = @ID_Ubicaciones"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Ubicacion no encontrada" });
    }

    res.json({
      ID_Ubicaciones: id,
      ID_Pabellon: req.body.ID_Pabellon,
      Aula: req.body.Aula,
      message: "Ubicacion actualizada correctamente" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la ubicación");
  }
};

/*FUNCION PARA ELIMINAR UNA UBICACION*/
export const deleteUbicacion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Ubicaciones", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.Ubicaciones WHERE ID_Ubicaciones = @ID_Ubicaciones"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Ubicacion no encontrada" });
    }

    return res.json({ message: "Ubicacion eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar la ubicación");
  }
};



