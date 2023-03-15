// import de archivo config
const conexion = require("../config/dbConfig");

const getAllEmployees = async () => {
  const row = await conexion
    .query("SELECT * FROM employees e")
    .spread((row) => row);
  return row;
};

const getById = async (employee_id) => {
  const sqlQuery = `SELECT * FROM  employees e WHERE e.employee_id = ${employee_id} `;
  const row = await conexion.query(sqlQuery).spread((row) => row);
  return row.length > 0 ? row[0] : [];
};

// conexion.query es un metodo js que recibe dos parametros, 1p- consulta a la db, 2p-arreglo con los valores que deseo insertar una consulta a la base de datos
// .spread funcion callback de mysql2-promise
const createEmployee = async (values) => {
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
const deleteEmployee = async (employee_id) => {
  const sqlQuery = `DELETE FROM employees WHERE employee_id = ${employee_id}`;
  const result = await conexion.query(sqlQuery).spread((result) => result);
  return result;
};

const updateEmployee = async (employee_id, values) => {
  console.log(employee_id);
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const sqlQuery = `UPDATE employees SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE employee_id = ${employee_id}`;
  const result = await conexion
    .query(sqlQuery, [first_name, last_name, cuit, team_id, join_date, rol])
    .spread((result) => result);
  return result;
};

module.exports = {
  getAllEmployees: getAllEmployees,
  getById: getById,
  createEmployee: createEmployee,
  deleteEmployee: deleteEmployee,
  updateEmployee: updateEmployee,
};
