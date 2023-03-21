//imports
const conexion = require("../config/dbConfig");
const HttpError = require("../models/httpError");

// obtiene toda la lista de assets
const getAllAssetsModel = async (limit, offset) => {
  try {
    const row = await conexion
      .query(`SELECT * FROM assets a LIMIT ${limit} OFFSET ${offset}`)
      .spread((row) => row);
    return row;
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
// obtiene los asset de un employee, segun su id
const getAssetsByEmployeeId = async (employee_id) => {
  try {
    const sqlQuery = `SELECT e.first_name, e.last_name, e.join_date, a.name, a.marca, a.type, a.purchase_date, a.code   FROM  assets a JOIN employees e ON a.employee_id = e.employee_id WHERE e.employee_id = ${employee_id} `;
    const row = await conexion.query(sqlQuery).spread((row) => row);
    return row;
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
// obtiene asset segun id
const getAssetByIdModel = async (asset_id) => {
  try {
    const sqlQuery = `SELECT * FROM assets WHERE asset_id = ${asset_id}`;
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
// creacion de un nuevo asset
const createAssetModel = async (values) => {
  try {
    const { name, type, code, marca, description, purchase_date, employee_id } =
      values;
    const result = await conexion
      .query(
        "INSERT INTO assets (name, type, code, marca, description, purchase_date, employee_id) values(?,?,?,?,?,?,?)",
        [name, type, code, marca, description, purchase_date, employee_id]
      )
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
// edicion del asset
const updateAssetModel = async (assetExist, values) => {
  try {
    const { asset_id } = assetExist;
    const { name, type, code, marca, description, purchase_date, employee_id } =
      values;
    const sqlQuery = `UPDATE assets SET name=?, type=?, code=?, marca=?, description=?, purchase_date=?, employee_id=? WHERE asset_id = ${asset_id}`;
    const result = await conexion
      .query(sqlQuery, [
        name ? name : assetExist.name,
        type ? type : assetExist.type,
        code ? code : assetExist.code,
        marca ? marca : assetExist.marca,
        description ? description : assetExist.description,
        purchase_date ? purchase_date : assetExist.purchase_date,
        employee_id ? employee_id : assetExist.employee_id,
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
// elimina Asset
const deleteAssetModel = async (asset_id) => {
  try {
    const sqlQuery = `DELETE FROM assets WHERE asset_id = ${asset_id}`;
    const result = await conexion.query(sqlQuery).spread((result) => result);
    return result;
  } catch (error) {
    const CustomError = new HttpError("Error", 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
// modifica a null, el FK de employee_id 
const modifyAssetEmployeeId = async (employee_id) => {
  const sqlQuery = `UPDATE assets SET employee_id=null WHERE employee_id = ${employee_id}`
  const result = await conexion.query(sqlQuery).spread((result) => result);
  return result
}

module.exports = {
  getAllAssetsModel,
  getAssetsByEmployeeId,
  getAssetByIdModel,
  createAssetModel,
  updateAssetModel,
  deleteAssetModel,
  modifyAssetEmployeeId
};
