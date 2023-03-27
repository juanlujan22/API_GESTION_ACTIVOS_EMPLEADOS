// imports
const conexion = require("../config/dbConfig");
const HttpError = require("../models/httpError");

//obtiene todos los empleados
const getAllEmployeesModel = async (limit, offset, first_name, last_name, cuit) => {
  try {
    let whereClause = '';
    let params = [];
    if (first_name) {
      whereClause += 'first_name = ? AND ';
      params.push(first_name);
    }
    if (last_name) {
      whereClause += 'last_name = ? AND ';
      params.push(last_name);
    }
    if (cuit) {
      whereClause += 'cuit = ? AND ';
      params.push(cuit);
    }
    if (whereClause.length > 0) {
      whereClause = 'WHERE ' + whereClause.slice(0, -5);
    }
    const [row, count] = await Promise.all([
      conexion.query(`SELECT * FROM employees e ${whereClause} LIMIT ${limit} OFFSET ${offset}`, params).spread((row) => row),
      conexion.query(`SELECT COUNT(*) AS count FROM employees e ${whereClause}`, params).spread((row) => row[0].count),
    ]);
    return [row, count];
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
// obtiene empleado segun id
const getEmployeeByIdModel = async (employee_id) => {
  try {
    const sqlQuery = `SELECT * FROM  employees e WHERE e.employee_id = ${employee_id} `;
    const row = await conexion.query(sqlQuery).spread((row) => row);
    return row.length > 0 ? row[0] : [];
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
// creacion de empleado
const createEmployeeModel = async (values) => {
  try {
    const { first_name, last_name, cuit, team_id, join_date, rol } = values;
    const result = await conexion
      .query(
        "INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)",
        [first_name, last_name, cuit, team_id, join_date, rol]
      )
      .spread((result) => result); // por la libreria mysql2-promise, el tema del callback
    return result;
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

//Elimina de la lista empleados segun id que traigo como parametro.
const deleteEmployeeModel = async (employee_id) => {
  try {

    const result = await conexion
      .query(`DELETE FROM employees WHERE employee_id = ${employee_id}`)
      .spread((result) => result);

    return result;
  } catch (error) {

    console.error("Error al eliminar los registros:", error);
  }
};

// Edicion del array viejo de empleado con los nuevos parametros recibidos. Permanecen los datos no editados
const updateEmployeeModel = async (emplExist, values) => {
  try {
    const { employee_id } = emplExist;
    const { first_name, last_name, cuit, team_id, join_date, rol } = values;
    const sqlQuery = `UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE employee_id = ${employee_id}`;
    const result = await conexion
      .query(sqlQuery, [
        first_name ? first_name : emplExist.first_name,
        last_name ? last_name : emplExist.last_name,
        cuit ? cuit : emplExist.cuit,
        team_id ? team_id : emplExist.team_id,
        join_date ? join_date : emplExist.join_date,
        rol ? rol : emplExist.rol,
      ])
      .spread((result) => result);
    return result;
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

module.exports = {
  getAllEmployeesModel,
  getEmployeeByIdModel,
  createEmployeeModel,
  deleteEmployeeModel,
  updateEmployeeModel,
};
