import { getConnection } from '../database/connection.js';
import sql from 'mssql';


/*FUNCION PARA VER TODOS LOS PABELLONES*/
export const getPabellones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Pabellon');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLO PABELLON*/
export const getPabellon = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Pabellon", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.Pabellon WHERE ID_Pabellon = @ID_Pabellon"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Pabellon no encontrado" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UN PABELLON*/
export const createPabellon = async (req, res) => {  
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Pabellon), 0) + 1 AS nextId FROM GestionActivos.Pabellon"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Pabellon", sql.Int, nextId)
      .input("ID_Departamento", sql.Int, req.body.ID_Departamento)
      .input("Letra", sql.Char, req.body.Letra)
      .query(
        "INSERT INTO GestionActivos.Pabellon (ID_Pabellon, ID_Departamento, Letra) VALUES (@ID_Pabellon, @ID_Departamento, @Letra)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Pabellon: nextId,
      ID_Departamento: req.body.ID_Departamento,
      Letra: req.body.Letra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el pabellon");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UN PABELLON*/
export const updatePabellon = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Pabellon", sql.Int, id)
      .input("ID_Departamento", sql.Int, req.body.ID_Departamento)
      .input("Letra", sql.Char, req.body.Letra)
      .query(
        "UPDATE GestionActivos.Pabellon SET ID_Departamento = @ID_Departamento, Letra = @Letra WHERE ID_Pabellon = @ID_Pabellon"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Pabellon no encontrado" });
    }

    res.json({
      message: "Pabellon actualizado correctamente",
      ID_Pabellon: id, 
      ID_Departamento: req.body.ID_Departamento,
      Letra: req.body.Letra,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el pabellon");
  }
};

/*FUNCION PARA ELIMINAR UN PABELLON */
export const deletePabellon = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Pabellon", sql.Int, req.params.id)
      .query(
        "DELETE FROM GestionActivos.Pabellon WHERE ID_Pabellon = @ID_Pabellon"
      );

    console.log(result);

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Pabellon no encontrado" });
    }

    return res.json({ message: "Pabellon eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el pabellon");
  }
};



