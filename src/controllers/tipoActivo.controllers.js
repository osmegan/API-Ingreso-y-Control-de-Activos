import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS TIPOS DE ACTIVOS*/
export const getTipoActivos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.TipoActivo');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO TIPO DE ACTIVO*/
export const getTipoActivo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_TipoActivo", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.TipoActivo WHERE ID_TipoActivo = @ID_TipoActivo"
      );

    if (result.recordset.length === 0) { 
      return res.status(404).json({ message: "Tipo de activo no encontrado" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el tipo de activo");
  }
};

/*FUNCION PARA CREAR UN TIPO DE ACTIVO*/
export const createTipoActivo = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_TipoActivo), 0) + 1 AS nextId FROM GestionActivos.TipoActivo"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_TipoActivo", sql.Int, nextId)
      .input("Nombre", sql.VarChar, req.body.Nombre) 
      .query(
        "INSERT INTO GestionActivos.TipoActivo (ID_TipoActivo, Nombre) VALUES (@ID_TipoActivo, @Nombre)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_TipoActivo: nextId,
      Nombre: req.body.Nombre
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el tipo de activo");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN TIPO DE ACTIVO*/
export const updateTipoActivo = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_TipoActivo", sql.Int, id) 
      .input("Nombre", sql.VarChar, req.body.Nombre)
      .query(
        "UPDATE GestionActivos.TipoActivo SET Nombre = @Nombre WHERE ID_TipoActivo = @ID_TipoActivo"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Tipo de activo no encontrado" });
    }

    res.json({
      ID_TipoActivo: id,
      Nombre: req.body.Nombre,
      message: "Tipo de activo actualizado correctamente" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el tipo de activo");
  }
};

/*FUNCION PARA ELIMINAR UN TIPO DE ACTIVO */
export const deleteTipoActivo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_TipoActivo", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.TipoActivo WHERE ID_TipoActivo = @ID_TipoActivo"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Tipo de activo no encontrado" });
    }

    return res.json({ message: "Tipo de activo eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el tipo de activo");
  }
};



