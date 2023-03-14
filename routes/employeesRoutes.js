//import de dependencias y variables
const router = require('express').Router();
// import de controllers;
const {findEmployees, deleteEmployee, updateEmployee , getEmployeById, createEmploye}=require('../controllers/employeesController');

// trae todos los empleados
router.get("/", findEmployees)
// trae empleado segun id
router.get("/:employee_id", getEmployeById)
// creacion de empleado
router.post('/create', createEmploye)

//ruta para eliminar un empleado
router.delete('/:employee_id', deleteEmployee)

// ruta para actualizar un empleado
router.put('/update/:id', updateEmployee)

// ruta para obtener todos los empleados
    // router.get('/', employeesontroller.getAllEmployees)
// ruta para obtener un solo empleado
// router.get('/:id', employeesontroller.getEmployeById)
// // ruta para crear un nuevo empleado
// router.post('/', employeesontroller.createEmploye)

// // ruta para eliminar un empleado
// router.delete('/:id', employeesontroller.deleteEmployee)
//export 
module.exports = router;