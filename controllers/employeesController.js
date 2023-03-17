//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// import de Model de employees
const employeModel = require("../models/employeeModel");
const { json } = require("express");

// trae todos employees, con paginado de a 5 resultados o según valor ingresado en query

const getAllEmployees = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit
    const resultado = await employeModel.getAllEmployeesModel(limit, offset);
    res.json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      "Fetching employees failed",
      500
    );
    res.json({ errorMessage: CustomError.message, code: CustomError.errorCode });
  }
};

//trae un solo employee mediante id
const getEmployeById = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const resultado = await employeModel.getEmployeeByIdModel(employee_id);
    // si id de empleado no existe, da error
    if(resultado.length===0){return res.json({message: "employee id does not exist"})}   

    res.status(200).json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      "Fetching employee failed, please try again.",
      500
    );
    res.json({ errorMessage: CustomError.message, code: CustomError.errorCode });
  }
};

// creacion de un nuevo employee
const createEmploye = async (req, res) => {
  try {
    const values = { ...req.body }
    const result = await employeModel.createEmployeeModel(values);
    res.status(201).json({ message:"employee created successfully",data: result });
  } catch (error) {
    console.log(error)
    const CustomError = new HttpError(`Creating employee failed. ${error}`, 500);
    res.json({errorMessage : CustomError.message, code: CustomError.errorCode});
}
};

const updateEmployee = async (req, res) => {
  try {
    //verifico que el id exista. si existe devuelve empleado a modificar, si no devuelve error
    const { employee_id } = req.params;
    const emplExist = await employeModel.getEmployeeByIdModel(employee_id)
    console.log(emplExist)
    if(emplExist==0){return res.json({message: "that employee does not exist"})}
    //si existe, envio al model, datos viejos y datos nuevos a editar
    const values = { ...req.body };
    const resultado = await employeModel.updateEmployeeModel(emplExist, values);
    res
      .status(200)
      .json({ message: `the employee whit id ${employee_id}, was succesfully updated!`, resultado });
  } catch (error) {
    const CustomError = new HttpError(
      `Update employee failed. ${error}`,
      500
    );
    res.json({ errorMessage: CustomError.message, code: CustomError.errorCode });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const emplExist = await employeModel.getEmployeeByIdModel(employee_id);
    if(emplExist==0){return res.json({message: "that employee does not exist"})}
    await employeModel.deleteEmployeeModel(employee_id);
    res.status(200).json({ message: `the employee id: ${employee_id}, was deleted succesfully!` });
  } catch (error) {
    const CustomError = new HttpError(
      `Delete employee failed.${error}`,
      401
    );
    res.json({ errorMessage: CustomError.message, code: CustomError.errorCode });
  }
};

// exports
module.exports = {
  getAllEmployees: getAllEmployees,
  createEmploye: createEmploye,
  getEmployeById: getEmployeById,
  deleteEmployee: deleteEmployee,
  updateEmployee: updateEmployee,
};
