/* 
Entidad employee contará con los siguientes campos
first_name
last_name
cuit
team_id
join_date
rol
*/

//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// falta import de validacion con express-validatos

// import de Model de empleado
const employeModel = require("../models/employeeModel") 

const getAllEmployees = async (req, res) => {
        const resultado = await employeModel.findEmployees()
        res.json({data : resultado});
};

const getEmployeById = async (req, res) => {
    const {employee_id}=req.params;
    const resultado = await employeModel.getById(employee_id)
    res.status(200).json({data: resultado});
//   try {
//     const empleados = await req.body;
//     res.status(201).json({ data: empleados });
//   } catch (err) {
//     res.status(400).json({message: "ERROR algo ta mal viteh!"})
//   }
};


const createEmploye = async (req, res) => {
    const values =  {...req.body};
    const result = await employeModel.createEmployee(values)
    console.log(result.ResultSetHeader.insertId)
    // const {result.insertId}=result
    // const employee= await employeModel.findById(insertId)
    res.status(201).json({ data: result });
};

const updateEmployee = async (req, res) => {
    const values =  {...req.body}
    const {employee_id}=req.params;
    const result = await employeModel.updateEmployee(employee_id, values)
    res.status(200).json({ message: 'the employee was succesfully updated!', result });
};

const deleteEmployee = async (req, res) => {
    const {employee_id}=req.params;
    await employeModel.deleteEmployee(employee_id )
    res.status(200).json({message: `the employee was deleted succesfully!`}) 
}
// const deleteEmployee = async (req, res) => {
//   try {
//     const empleados = await req.body;
//     res.status(201).json({ data: empleados });
//   } catch (err) {
//     // const error = new HttpError("Error al realizar", 404);
//     // return next(error);
//   }
// };

// exports.getAllEmployees = getAllEmployees;
module.exports={
    findEmployees:getAllEmployees,
    createEmploye:createEmploye,
    getEmployeById:getEmployeById,
    deleteEmployee:deleteEmployee,
    updateEmployee:updateEmployee
}
// exports.getEmployeById = getEmployeById;
// module.exports={createEmploye:createEmploye} 
// exports.createEmploye = createEmploye;
// module.exports={getEmployeById:getEmployeById}

// exports.updateEmployee = updateEmployee;
// exports.deleteEmployee = deleteEmployee;
