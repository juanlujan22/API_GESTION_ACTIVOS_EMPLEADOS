// dependencias
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
//dependencia para acceder a las variables a través del objeto process y manejar las variables de entorno .env 
require("dotenv").config();
// import de routes
const assetsRouter = require("./routes/assetsRoutes");
const employeesRouter = require("./routes/employeesRoutes");

// Variables & App
const app = express();
const PORT = process.env.DB_PORT || 3001;

//middleware global, pra resolver error cors
app.use(cors());
//middleware global, para recibir bodies de formato json
app.use(express.json({ limit: "50mb" }));
// middleware global, para ver logs de consultas en la terminal. Borrar en fase de produccion
app.use(morgan("dev"));

//end point inicial, con el router
app.use("/api/v1/assets", assetsRouter); //http://localhost:3001/api/v1
app.use("/api/v1/employees", employeesRouter); //http://localhost:3001/api/v1

// endpoint de error cuando se ingresa a una ruta que no existe
app.set("title", "Ups, The requested page is not available, Error 404");
app.get("/*", (req, res) => {
  res.send(app.get("title"));
});

//conexion
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
