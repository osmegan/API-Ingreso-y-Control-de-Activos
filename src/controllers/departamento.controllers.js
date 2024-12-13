import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LOS DEPARTAMENTOS*/
export const getDepartamentos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Departamento');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO DEPARTAMENTO*/
export const getDepartamento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Departamento", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.Departamento WHERE ID_Departamento = @ID_Departamento"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UN DEPARTAMENTO*/
export const createDepartamento = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Departamento), 0) + 1 AS nextId FROM GestionActivos.Departamento"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Departamento", sql.Int, nextId)
      .input("Nombre", sql.VarChar, req.body.Nombre)
      .query(
        "INSERT INTO GestionActivos.Departamento (ID_Departamento, Nombre) VALUES (@ID_Departamento, @Nombre)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Departamento: nextId,
      Nombre: req.body.Nombre,

    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el departamento");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN DEPARTAMENTO*/
export const updateDepartamento = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      // Usar 'id' en lugar de 'nextId' para identificar el departamento a actualizar
      .input("ID_Departamento", sql.Int, id)
      .input("Nombre", sql.VarChar, req.body.Nombre)
      .query(
        // Asegúrate de que la tabla y las columnas sean correctas
        "UPDATE GestionActivos.Departamento SET Nombre = @Nombre WHERE ID_Departamento = @ID_Departamento"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    res.json({
      ID_Departamento: id,
      Nombre: req.body.Nombre,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el departamento");
  }
};

/*FUNCION PARA ELIMINAR UN ACTIVO */
export const deleteDepartamento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Departamento", sql.Int, req.params.id)
    .query(
      "DELETE FROM GestionActivos.Departamento WHERE ID_Departamento = @ID_Departamento"
    );

  console.log(result);

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  return res.json({ message: "Departamento eliminado" });
};