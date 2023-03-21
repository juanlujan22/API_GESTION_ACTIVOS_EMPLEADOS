// dependencias
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// imports
const assetsRouter = require("./routes/assetsRoutes");
const employeesRouter = require("./routes/employeesRoutes");

// variables
const app = express();
const PORT = process.env.API_PORT || 3001;

//middleware globales
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

//end point inicial, con el router
app.use("/api/v1/assets", assetsRouter); 
app.use("/api/v1/employees", employeesRouter); 

// endpoint cuando se ingresa a una ruta que no existe
app.set("title", "Ups, The requested page is not available, Error 404");
app.get("/*", (req, res) => {
  res.send(app.get("title"));
});

//conexion
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
