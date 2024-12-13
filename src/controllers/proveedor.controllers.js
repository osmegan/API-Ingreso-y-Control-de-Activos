import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS PROVEEDORES*/
export const getProveedores = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Proveedor');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO PROVEEDOR*/
export const getProveedor = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Proveedor", sql.Int, req.params.id)
      .query(
        "SELECT * FROM GestionActivos.Proveedor WHERE ID_Proveedor = @ID_Proveedor"
      );

    if (result.recordset.length === 0) { 
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el proveedor");
  }
};

/*FUNCION PARA CREAR UN PROVEEDOR*/
export const createProveedor = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Proveedor), 0) + 1 AS nextId FROM GestionActivos.Proveedor"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Proveedor", sql.Int, nextId)
      .input("Nombre", sql.VarChar, req.body.Nombre)
      .input("Direccion", sql.VarChar, req.body.Direccion)
      .input("Telefono", sql.NVarChar, req.body.Telefono)
      .input("Contacto", sql.VarChar, req.body.Contacto)
      .query(
        "INSERT INTO GestionActivos.Proveedor (ID_Proveedor, Nombre, Direccion, Telefono, Contacto) VALUES (@ID_Proveedor, @Nombre, @Direccion, @Telefono, @Contacto)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Proveedor: nextId,
      Nombre: req.body.Nombre,
      Direccion: req.body.Direccion,
      Telefono: req.body.Telefono,
      Contacto: req.body.Contacto
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el proveedor");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN PROVEEDOR*/
export const updateProveedor = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Proveedor", sql.Int, id)
      .input("Nombre", sql.VarChar, req.body.Nombre)
      .input("Direccion", sql.VarChar, req.body.Direccion)
      .input("Telefono", sql.NVarChar, req.body.Telefono)
      .input("Contacto", sql.VarChar, req.body.Contacto)
      .query(
        "UPDATE GestionActivos.Proveedor SET Nombre = @Nombre, Direccion = @Direccion, Telefono = @Telefono, Contacto = @Contacto WHERE ID_Proveedor = @ID_Proveedor"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({
      ID_Proveedor: id,
      Nombre: req.body.Nombre,
      Direccion: req.body.Direccion,
      Telefono: req.body.Telefono,
      Contacto: req.body.Contacto,
      message: "Proveedor actualizado correctamente", 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el proveedor");
  }
};

/*FUNCION PARA ELIMINAR UN PROVEEDOR */
export const deleteProveedor = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Proveedor", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.Proveedor WHERE ID_Proveedor = @ID_Proveedor"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    return res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el proveedor");
  }
};


