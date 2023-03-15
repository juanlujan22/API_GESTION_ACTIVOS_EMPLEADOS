// dependencia para conectar mysql con la db
const conexion = require("mysql2-promise")();
const dotEnv = require("dotenv");

dotEnv.config();

//conexion con la db
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
conexion.configure(config);

module.exports = conexion;
