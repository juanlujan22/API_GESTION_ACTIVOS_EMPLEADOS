// dependencia para conectar mysql con la db
const conexion = require("mysql2-promise")();

//dependencia para acceder a las variables a través del objeto process y manejar las variables de entorno .env 
require("dotenv").config();

//conexion con la db
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
conexion.configure(config);

module.exports = conexion;
