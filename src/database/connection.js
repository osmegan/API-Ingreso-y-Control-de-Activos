import sql from 'mssql'

const dbSettings = {
  user: "adminsa",
  password: "Dum81273540",
  server: "databs-2024.database.windows.net",
  database: "Equipos_Tecnologicos",
  options:{
    encrypt: true,
    trustServerCertificate:true,
  }
};

export const getConnection = async () =>{
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error)
  }
} 