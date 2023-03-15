/* 
Entidad asset contará con los siguientes campos
name
type
code
marca
description
purchase_date
*/
//getAllAssetsModel, getAssetsByEmployeeId, getAssetByIdModel, createAssetModel, updateAssetModel, deleteAssetModel

/*
QUERY=INSERT INTO `assets` (`id`, `name`, `type`, `code`, `marca`, `description`, `purchase_date`, `employee_id`) VALUES ('25', 'cosa', 'cosa', '321', 'cosa', 'una cosa', '2023-03-13', '13')
*/ 
const conexion = require("../config/dbConfig");

const getAllAssetsModel = async ()=>{
    const row = await conexion
    .query("SELECT * FROM assets a")
    .spread((row) => row);
  return row;
}

const getAssetsByEmployeeId =  async (employee_id)=>{
    // 
    const sqlQuery=`SELECT e.first_name, e.last_name, e.join_date, a.name, a.marca, a.type, a.purchase_date, a.code   FROM  assets a JOIN employees e ON a.employee_id = e.employee_id WHERE e.employee_id = ${employee_id} `;
    const row = await conexion.query(sqlQuery).spread((row)=>row)
    return row
}

const getAssetByIdModel = async (asset_id)=>{
    console.log(asset_id)
    const sqlQuery= `SELECT * FROM assets WHERE asset_id = ${asset_id}`
    const row = await conexion.query(sqlQuery).spread((row) => row);
    return row.length > 0 ? row[0] : [];
}

const createAssetModel = async (values)=>{
    const { name, type,code, marca, description, purchase_date, employee_id} = values;
    const result = await conexion.query("INSERT INTO assets (name, type, code, marca, description, purchase_date, employee_id) values(?,?,?,?,?,?,?)",
        [name,type,code,marca,description,purchase_date,employee_id]).spread((result) => result); 
     return result;
}

const updateAssetModel = async (asset_id, values)=>{
    const { name, type, code, marca, description, purchase_date, employee_id } = values;
    const sqlQuery = `UPDATE assets SET name=?, type=?, code=?, marca=?, description=?, purchase_date=?, employee_id=? WHERE asset_id = ${asset_id}`;
    const result = await conexion.query(sqlQuery, [name, type, code, marca, description, purchase_date, employee_id]).spread((result) => result);
    return result;
}

const deleteAssetModel = async (asset_id)=>{
    const sqlQuery = `DELETE FROM assets WHERE asset_id = ${asset_id}`;
    const result = await conexion.query(sqlQuery).spread((result) => result);
    return result;
}







module.exports={
    getAllAssetsModel, 
    getAssetsByEmployeeId, 
    getAssetByIdModel, 
    createAssetModel, 
    updateAssetModel, 
    deleteAssetModel
}