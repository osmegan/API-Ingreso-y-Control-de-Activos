import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS USUARIOS*/
export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM GestionActivos.Usuario');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

/*FUNCION PARA VER 1 SOLO USUARIO*/
export const getUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Usuario", sql.Int, req.params.id) 
      .query(
        "SELECT * FROM GestionActivos.Usuario WHERE ID_Usuario = @ID_Usuario"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el usuario");
  }
};

/*FUNCION PARA CREAR UN USUARIO*/
export const createUsuario = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Usuario), 0) + 1 AS nextId FROM GestionActivos.Usuario"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Usuario", sql.Int, nextId)
      .input("Nombre1", sql.VarChar, req.body.Nombre1)
      .input("Nombre2", sql.VarChar, req.body.Nombre2)
      .input("Apellido1", sql.VarChar, req.body.Apellido1)
      .input("Apellido2", sql.VarChar, req.body.Apellido2)
      .input("Correo", sql.VarChar, req.body.Correo)
      .input("Contraseña", sql.VarChar, req.body.Contraseña)
      .input("Cedula", sql.VarChar, req.body.Cedula)
      .input("Telefono", sql.NVarChar, req.body.Telefono)
      .input("ID_Rol", sql.Int, req.body.ID_Rol)
      .input("ID_Ubicacion", sql.Int, req.body.ID_Ubicacion)
      .query(
        "INSERT INTO GestionActivos.Usuario (ID_Usuario, Nombre1, Nombre2, Apellido1, Apellido2, Correo, Contraseña, Cedula, Telefono, ID_Rol, ID_Ubicacion) VALUES (@ID_Usuario, @Nombre1, @Nombre2, @Apellido1, @Apellido2, @Correo, @Contraseña, @Cedula, @Telefono, @ID_Rol, @ID_Ubicacion)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Usuario: nextId,
      Nombre1: req.body.Nombre1,
      Nombre2: req.body.Nombre2,
      Apellido1: req.body.Apellido1,
      Apellido2: req.body.Apellido2,
      Correo: req.body.Correo,
      Contraseña: req.body.Contraseña,
      Cedula: req.body.Cedula,
      Telefono: req.body.Telefono,
      ID_Rol: req.body.ID_Rol,
      ID_Ubicacion: req.body.ID_Ubicacion
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el usuario");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN USUARIO*/
export const updateUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Usuario", sql.Int, id) 
      .input("Nombre1", sql.VarChar, req.body.Nombre1)
      .input("Nombre2", sql.VarChar, req.body.Nombre2)
      .input("Apellido1", sql.VarChar, req.body.Apellido1)
      .input("Apellido2", sql.VarChar, req.body.Apellido2)
      .input("Correo", sql.VarChar, req.body.Correo)
      .input("Contraseña", sql.VarChar, req.body.Contraseña)
      .input("Cedula", sql.VarChar, req.body.Cedula)
      .input("Telefono", sql.NVarChar, req.body.Telefono)
      .input("ID_Rol", sql.Int, req.body.ID_Rol)
      .input("ID_Ubicacion", sql.Int, req.body.ID_Ubicacion)
      .query(
        "UPDATE GestionActivos.Usuario SET Nombre1 = @Nombre1, Nombre2 = @Nombre2, Apellido1 = @Apellido1, Apellido2 = @Apellido2, Correo = @Correo, Contraseña = @Contraseña, Cedula = @Cedula, Telefono = @Telefono, ID_Rol = @ID_Rol, ID_Ubicacion = @ID_Ubicacion WHERE ID_Usuario = @ID_Usuario"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      ID_Usuario: id, // CORREGIDO: Uso de `id`
      Nombre1: req.body.Nombre1,
      Nombre2: req.body.Nombre2,
      Apellido1: req.body.Apellido1,
      Apellido2: req.body.Apellido2,
      Correo: req.body.Correo,
      Contraseña: req.body.Contraseña,
      Cedula: req.body.Cedula,
      Telefono: req.body.Telefono,
      ID_Rol: req.body.ID_Rol,
      ID_Ubicacion: req.body.ID_Ubicacion,
      message: "Usuario actualizado correctamente" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el usuario");
  }
};

/*FUNCION PARA ELIMINAR UN USUARIO */
export const deleteUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Usuario", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.Usuario WHERE ID_Usuario = @ID_Usuario"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el usuario");
  }
};




