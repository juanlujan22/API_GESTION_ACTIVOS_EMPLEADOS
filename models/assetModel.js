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

const conexion = require("../config/dbConfig");

const getAllAssetsModel = async (limit, offset)=>{
    const row = await conexion
    .query(`SELECT * FROM assets a LIMIT ${limit} OFFSET ${offset}`)
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

const updateAssetModel = async (assetExist, values)=>{
    const {asset_id}=assetExist
    const { name, type, code, marca, description, purchase_date, employee_id } = values;
    const sqlQuery = `UPDATE assets SET name=?, type=?, code=?, marca=?, description=?, purchase_date=?, employee_id=? WHERE asset_id = ${asset_id}`;
    const result = await conexion.query(sqlQuery, [
        name? name:assetExist.name, 
        type?type:assetExist.type, 
        code?code:assetExist.code, 
        marca?marca:assetExist.marca, 
        description?description:assetExist.description, 
        purchase_date?purchase_date:assetExist.purchase_date, 
        employee_id?employee_id:values.employee_id]).spread((result) => result);
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