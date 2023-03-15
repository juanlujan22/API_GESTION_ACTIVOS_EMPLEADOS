//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// falta import de validacion con express-validatos

// import de Model de empleado
const employeModel = require("../models/employeeModel");

// implementar paginado en get all employees y en get all assets
const getAllEmployees = async (req, res) => {
  try {
    const resultado = await employeModel.getAllEmployees();
    res.json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      "Fetching employees failed, please try again.",
      500
    );
    res.json({ errorMessage: CustomError.message, CustomError });
  }
};

const getEmployeById = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const resultado = await employeModel.getById(employee_id);
    res.status(200).json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      "Fetching employee failed, please try again.",
      500
    );
    res.json({ errorMessage: CustomError.message, CustomError });
  }
};

const createEmploye = async (req, res) => {
  try {
    const values = { ...req.body }
    const result = await employeModel.createEmployee(values);
    res.status(201).json({ data: result });
  } catch (error) {
    console.log(error)
    const CustomError = new HttpError('Creating employee failed, please complete the inputs correctly.', 400);
    res.json({errorMessage : CustomError.message, CustomError});
}
};

const updateEmployee = async (req, res) => {
  try {
    const values = { ...req.body };
    const { employee_id } = req.params;
    const result = await employeModel.updateEmployee(employee_id, values);
    res
      .status(200)
      .json({ message: "the employee was succesfully updated!", result });
  } catch (error) {
    const CustomError = new HttpError(
      "Update employee failed, please try again.",
      500
    );
    res.json({ errorMessage: CustomError.message, CustomError });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    await employeModel.deleteEmployee(employee_id);
    res.status(200).json({ message: `the employee id: ${employee_id}, was deleted succesfully!` });
  } catch (error) {
    const CustomError = new HttpError(
      "Delete employee failed, please try again.",
      401
    );
    res.json({ errorMessage: CustomError.message, CustomError });
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
