import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS COLORES DE LOS ACTIVOS*/
export const getColorActivos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.ColorActivo');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO COLOR DE LOS ACTIVOS*/
export const getColorActivo = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_ColorActivo", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.ColorActivo WHERE ID_ColorActivo = @ID_ColorActivo"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Color no encontrado" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UN COLOR DE ACTIVO*/
export const createColorActivo = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_ColorActivo), 0) + 1 AS nextId FROM GestionActivos.ColorActivo"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_ColorActivo", sql.Int, nextId)
      .input("NombreColor", sql.VarChar, req.body.NombreColor)
      .query(
        "INSERT INTO GestionActivos.ColorActivo (ID_ColorActivo, NombreColor) VALUES (@ID_ColorActivo, @NombreColor)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_ColorActivo: nextId,
      NombreColor: req.body.NombreColor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el color del activo");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DEL COLOR DEL ACTIVO*/
export const updateColorActivo = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_ColorActivo", sql.Int, id)
      .input("NombreColor", sql.VarChar, req.body.NombreColor)
      .query(
        "UPDATE GestionActivos.ColorActivo SET NombreColor = @NombreColor WHERE ID_ColorActivo = @ID_ColorActivo"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Color no encontrado" });
    }

    res.json({
      ID_ColorActivo: id,
      NombreColor: req.body.NombreColor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el color del activo");
  }
};

/*FUNCION PARA ELIMINAR UN COLOR DE ACTIVO */
export const deleteColorActivo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_ColorActivo", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.ColorActivo WHERE ID_ColorActivo = @ID_ColorActivo"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Color activo no encontrado" });
    }

    return res.json({ message: "Color activo eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al eliminar el color activo");
  }
};



