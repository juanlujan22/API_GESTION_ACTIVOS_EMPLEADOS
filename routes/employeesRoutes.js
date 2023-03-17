//import de dependencias y variables
const router = require("express").Router();
// import de controllers;
const {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeById,
  createEmploye,
} = require("../controllers/employeesController");

// validator
const { validateCreateEmployee } = require("../validators/employeesValidator");

// trae todos los empleados
router.get("/", getAllEmployees);
// trae empleado segun id
router.get("/:employee_id", getEmployeById);
// creacion de empleado
router.post("/create", validateCreateEmployee, createEmploye);

//ruta para eliminar un empleado
router.delete("/delete/:employee_id", deleteEmployee);

// ruta para actualizar un empleado
router.put("/update/:employee_id", updateEmployee);

//export
module.exports = router;
