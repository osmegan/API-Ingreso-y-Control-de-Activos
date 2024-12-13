import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS TIPOS DE ROL*/
export const getTipoRoles = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.TipoRol');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO TIPO DE ROL*/
export const getTipoRol = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Rol", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.TipoRol WHERE ID_Rol = @ID_Rol"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Tipo de rol no encontrado" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el tipo de rol");
  }
};

/*FUNCION PARA CREAR UN TIPO DE ROL*/
export const createTipoRol = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Rol), 0) + 1 AS nextId FROM GestionActivos.TipoRol"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Rol", sql.Int, nextId)
      .input("NombreRol", sql.VarChar, req.body.NombreRol)
      .input("Descripcion", sql.VarChar, req.body.Descripcion)
      .query(
        "INSERT INTO GestionActivos.TipoRol (ID_Rol, NombreRol, Descripcion) VALUES (@ID_Rol, @NombreRol, @Descripcion)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Rol: nextId,
      NombreRol: req.body.NombreRol,
      Descripcion: req.body.Descripcion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el tipo de rol");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN TIPO DE ROL*/
export const updateTipoRol = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Rol", sql.Int, id)
      .input("NombreRol", sql.VarChar, req.body.NombreRol)
      .input("Descripcion", sql.VarChar, req.body.Descripcion)
      .query(
        "UPDATE GestionActivos.TipoRol SET NombreRol = @NombreRol, Descripcion = @Descripcion WHERE ID_Rol = @ID_Rol"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Tipo de rol no encontrado" });
    }

    res.json({
      ID_Rol: id,
      NombreRol: req.body.NombreRol,
      Descripcion: req.body.Descripcion,
      message: "Tipo de rol actualizado correctamente" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el tipo de rol");
  }
};

/*FUNCION PARA ELIMINAR UN TIPO DE ROL*/
export const deleteTipoRol = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Rol", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.TipoRol WHERE ID_Rol = @ID_Rol"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Tipo de rol no encontrado" });
    }

    return res.json({ message: "Tipo de rol eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el tipo de rol");
  }
};





