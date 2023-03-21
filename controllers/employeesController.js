//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// import de Model de employees
const employeModel = require("../models/employeeModel");

// trae todos employees, con paginado de a 5 resultados o según valor ingresado en query
const getAllEmployees = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit;
    const resultado = await employeModel.getAllEmployeesModel(limit, offset);
    res.json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError("Fetching employees failed", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

//trae un solo employee mediante id
const getEmployeById = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const resultado = await employeModel.getEmployeeByIdModel(employee_id);
    // si id de empleado no existe, da error
    if (resultado.length === 0) {
      return res.status(404).json({ message: "employee id does not exist" });
    }

    res.status(200).json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      "Fetching employee failed, please try again.",
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

// creacion de un nuevo employee
const createEmploye = async (req, res) => {
  try {
    const values = { ...req.body };
    const result = await employeModel.createEmployeeModel(values);
    res
      .status(201)
      .json({ message: "employee created successfully", data: result });
  } catch (error) {
    const CustomError = new HttpError(
      `Creating employee failed. ${error}`,
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
//edicion de empleado
const updateEmployee = async (req, res) => {
  try {
    //verifico que el id exista. si existe devuelve empleado a modificar, si no devuelve error
    const { employee_id } = req.params;
    const emplExist = await employeModel.getEmployeeByIdModel(employee_id);
    if (emplExist.length == 0) {
      return res.status(404).json({ message: "that employee does not exist" });
    }
    //si existe, envio al model, datos viejos y datos nuevos a editar
    const values = { ...req.body };
    const resultado = await employeModel.updateEmployeeModel(emplExist, values);
    res.status(200).json({
      message: `the employee whit id ${employee_id}, was succesfully updated!`,
      resultado,
    });
  } catch (error) {
    const CustomError = new HttpError(`Update employee failed. ${error}`, 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

// eliminacion de empleado.
const deleteEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const emplExist = await employeModel.getEmployeeByIdModel(employee_id);
    // si el id del empleado no existe, arroja error
    if (emplExist.length == 0) {
      return res.status(404).json({ message: "that employee does not exist" });
    }
    //se verifica si el employee_id tiene assets y modifica el employee_id a null
    const existAsset = await assetModel.getAssetsByEmployeeId(employee_id);
    console.log(existAsset);
    // si tiene assets modifica el employee_id a null, con metodo de asset
    if (existAsset.length >= 1) {
      await assetModel.modifyAssetEmployeeId(employee_id);
    }
    // elimino el empleado
    await employeModel.deleteEmployeeModel(employee_id);
    res.status(200).json({
      message: `the employee id: ${employee_id}, was deleted succesfully!`,
    });
  } catch (error) {
    const CustomError = new HttpError(`Delete employee failed.${error}`, 401);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

// exports
module.exports = {
  getAllEmployees,
  createEmploye,
  getEmployeById,
  deleteEmployee,
  updateEmployee,
};
