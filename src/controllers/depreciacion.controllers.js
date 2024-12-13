import { getConnection } from '../database/connection.js';
import sql from 'mssql';

/*FUNCION PARA VER TODOS LAS DEPRECIACIONES*/
export const getDepreciacion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query('SELECT * FROM GestionActivos.Depreciacion');
  res.json(result.recordset);
};

/*FUNCION PARA VER 1 SOLA DEPRECIACION*/
export const getDepreciacionActivo = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Depreciacion", sql.Int, req.params.id)
    .query(
      "SELECT * FROM GestionActivos.Depreciacion WHERE ID_Depreciacion = @ID_Depreciacion"
    );

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Depreciacion no encontrada" });
  }
  return res.json(result.recordset[0]);
};

/*FUNCION PARA CREAR UNA DEPRECIACION*/
export const createDepreciacion = async (req, res) => {
  console.log(req.body);

  try {
    const pool = await getConnection();

    // Obtener el próximo ID disponible
    const maxIdResult = await pool
      .request()
      .query(
        "SELECT ISNULL(MAX(ID_Depreciacion), 0) + 1 AS nextId FROM GestionActivos.Depreciacion"
      );
    const nextId = maxIdResult.recordset[0].nextId;

    const result = await pool
      .request()
      .input("ID_Depreciacion", sql.Int, nextId)
      .input("ValorResidual", sql.Decimal, req.body.ValorResidual)
      .input("VidaUtil", sql.Int, req.body.VidaUtil)
      .input("DepreciacionAnual", sql.Decimal, req.body.DepreciacionAnual)
      .input("ID_Activo", sql.Int, req.body.ID_Activo)
      .input("TipoDepreciacion", sql.Int, req.body.TipoDepreciacion)
      .query(
        "INSERT INTO GestionActivos.Depreciacion (ID_Depreciacion, ValorResidual, VidaUtil, DepreciacionAnual, ID_Activo, TipoDepreciacion) VALUES (@ID_Depreciacion, @ValorResidual, @VidaUtil, @DepreciacionAnual, @ID_Activo, @TipoDepreciacion)"
      );
    console.log(result);

    res.json({
      id: nextId,
      ID_Depreciacion: nextId,
      ValorResidual: req.body.ValorResidual,
      VidaUtil: req.body.VidaUtil,
      DepreciacionAnual: req.body.DepreciacionAnual,
      ID_Activo: req.body.ID_Activo,
      TipoDepreciacion: req.body.TipoDepreciacion
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la depreciación");
  }
};

/*FUNCION PARA ACTUALIZAR INFORMACION DE UNA DEPRECIACION*/
export const updateDepreciacion = async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("ID_Depreciacion", sql.Int, id)
      .input("ValorResidual", sql.Decimal, req.body.ValorResidual)
      .input("VidaUtil", sql.Int, req.body.VidaUtil)
      .input("DepreciacionAnual", sql.Decimal, req.body.DepreciacionAnual)
      .input("ID_Activo", sql.Int, req.body.ID_Activo)
      .input("TipoDepreciacion", sql.Int, req.body.TipoDepreciacion)
      .query(
        "UPDATE GestionActivos.Depreciacion SET ValorResidual = @ValorResidual, VidaUtil = @VidaUtil, DepreciacionAnual = @DepreciacionAnual, ID_Activo = @ID_Activo, TipoDepreciacion = @TipoDepreciacion WHERE ID_Depreciacion = @ID_Depreciacion"
      );

    if (result.rowsAffected[0] == 0) {
      return res.status(404).json({ message: "Depreciacion no encontrada" });
    }

    res.json({
      ID_Depreciacion: id,
      ValorResidual: req.body.ValorResidual,
      VidaUtil: req.body.VidaUtil,
      DepreciacionAnual: req.body.DepreciacionAnual,
      ID_Activo: req.body.ID_Activo,
      TipoDepreciacion: req.body.TipoDepreciacion
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la depreciación");
  }
};

/*FUNCION PARA ELIMINAR UNA DEPRECIACION*/
export const deleteDepreciacion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("ID_Depreciacion", sql.Int, req.params.id)
    .query(
      "DELETE FROM GestionActivos.Depreciacion WHERE ID_Depreciacion = @ID_Depreciacion"
    );

  console.log(result);

  if (result.rowsAffected[0] == 0) {
    return res.status(404).json({ message: "Depreciacion no encontrada" });
  }

  return res.json({ message: "Depreciacion eliminada" });
};





