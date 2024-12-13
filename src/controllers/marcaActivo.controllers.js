import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LAS MARCAS*/
export const getMarcaActivos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.MarcaActivo');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLA MARCA*/
export const getMarcaActivo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_MarcaActivo", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.MarcaActivo WHERE ID_MarcaActivo = @ID_MarcaActivo"
      );

    if (result.recordset.length === 0) { 
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la marca");
  }
};

/*FUNCION PARA CREAR UNA MARCA*/
export const createMarcaActivo = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_MarcaActivo), 0) + 1 AS nextId FROM GestionActivos.MarcaActivo"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_MarcaActivo", sql.Int, nextId)
      .input("NombreMarca", sql.VarChar, req.body.NombreMarca)
      .input("Descripcion", sql.NVarChar, req.body.Descripcion)
      .query(
        "INSERT INTO GestionActivos.MarcaActivo (ID_MarcaActivo, NombreMarca, Descripcion) VALUES (@ID_MarcaActivo, @NombreMarca, @Descripcion)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_MarcaActivo: nextId,
      NombreMarca: req.body.NombreMarca,
      Descripcion: req.body.Descripcion,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear marca");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UNA MARCA*/
export const updateMarcaActivo = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_MarcaActivo", sql.Int, id)
      .input("NombreMarca", sql.VarChar, req.body.NombreMarca)
      .input("Descripcion", sql.NVarChar, req.body.Descripcion)
      .query(
        "UPDATE GestionActivos.MarcaActivo SET NombreMarca = @NombreMarca, Descripcion = @Descripcion WHERE ID_MarcaActivo = @ID_MarcaActivo"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    res.json({
      ID_MarcaActivo: id, 
      NombreMarca: req.body.NombreMarca,
      Descripcion: req.body.Descripcion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la marca");
  }
};

/*FUNCION PARA ELIMINAR UNA MARCA*/
export const deleteMarcaActivo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_MarcaActivo", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.MarcaActivo WHERE ID_MarcaActivo = @ID_MarcaActivo"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    return res.json({ message: "Marca eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar la marca");
  }
};



