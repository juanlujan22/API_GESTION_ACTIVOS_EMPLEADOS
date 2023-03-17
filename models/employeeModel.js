// import de conexion a la DB
const conexion = require("../config/dbConfig");

const getAllEmployeesModel = async (limit, offset) => {
  const row = await conexion
    .query(`SELECT*FROM employees e LIMIT ${limit} OFFSET ${offset}`)
    .spread((row) => row);
  return row;
};

const getEmployeeByIdModel = async (employee_id) => {
  const sqlQuery = `SELECT * FROM  employees e WHERE e.employee_id = ${employee_id} `;
  const row = await conexion.query(sqlQuery).spread((row) => row);
  return row.length > 0 ? row[0] : [];
};

const createEmployeeModel = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const result = await conexion
    .query(
      "INSERT INTO employees(first_name, last_name, cuit, team_id, join_date, rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]
    )
    .spread((result) => result); // por la libreria mysql2-promise, el tema del callback
  return result;
};

//Elimina de la lista empleados segun id que traigo como parametro
const deleteEmployeeModel = async (employee_id) => {
  try {
    // cuando hay que hacer 2 consultas o sentencias, en un metodo. hasta que nose completen los dos, me das el ok
    const result1 = await conexion
      .query(`DELETE FROM assets WHERE employee_id = ${employee_id}`)
      .spread((result) => result);
    const result2 = await conexion
      .query(`DELETE FROM employees WHERE employee_id = ${employee_id}`)
      .spread((result) => result);

    return result1, result2;
  } catch (error) {
    // Deshacer la transacción en caso de error
    // await conexion.rollback(); //regresar antes de que se realice la transaccion
    console.error("Error al eliminar los registros:", error);
  }
};

// reemplazo con los nuevos parametros recibidos, el array viejo de empleado. Permanecen los datos no editados
const updateEmployeeModel = async (emplExist, values) => {
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
};

module.exports = {
  getAllEmployeesModel,
  getEmployeeByIdModel,
  createEmployeeModel,
  deleteEmployeeModel,
  updateEmployeeModel,
};
