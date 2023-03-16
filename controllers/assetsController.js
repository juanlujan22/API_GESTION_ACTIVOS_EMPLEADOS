//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// import del model de assets
const assetModel=require("../models/assetModel")

// trae todos los assets, con paginado de a 5 resultados o según valor ingresado en query
const getAllAssets = async (req, res) => { 
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const offset = (page - 1) * limit
        const resultado = await assetModel.getAllAssetsModel(limit, offset);
        res.json({ data: resultado });
      } catch (error) {
        const CustomError = new HttpError(
          `Fetching assets failed. Error: ${error}`,
          500
        );
        res.json({ errorMessage: CustomError.message, code: CustomError.errorCode });
      }
};

//trae assets de un empleado, mediante employe_id 
const getAssetsByEmployeeId = async (req, res) => {
  try {
    const {employee_id}=req.params;
    const  result = await assetModel.getAssetsByEmployeeId(employee_id);
      // si id de asset no existe, da error
    if(result.length===0){return res.json({message: "employee id does not exist"})}
    res.json({data:  result});
  } catch (error) {
    const CustomError = new HttpError(
      `Fetching assets failed. Error: ${error}`,
      500
    );
    res.json({ errorMessage: CustomError.message, CustomError });
  }
};

//trae un solo asset mediante asset_id
const getAssetById = async (req, res) => {
      try {
      const  {asset_id}  = req.params;
      const resultado = await assetModel.getAssetByIdModel(asset_id);
      if(resultado.length===0){return res.json({message: "asset not exist"})}   
      
      res.status(200).json({ data: resultado });
      } catch (error) {
        const CustomError = new HttpError(
          `Fetching assets failed. Error: ${error}`,
          500
        );
        res.json({ errorMessage: CustomError.message, CustomError });
      }
};

// creacion de un nuevo asset
const createAsset = async (req, res) => {
    try {
        const values = { ...req.body };
        const result = await assetModel.createAssetModel(values);
        res.status(201).json({ data: result });
      } catch (error) {
        const CustomError = new HttpError(
          `Creating assets failed, ERROR ${error}`, 
          500);
        res.json({errorMessage : CustomError.message, CustomError});
    }
};

const updateAsset = async (req, res) => {
    try {
        const { asset_id } = req.params;
        const assetExist = await assetModel.getAssetByIdModel(asset_id);
        console.log(assetExist)
        const values = { ...req.body };
        const result = await assetModel.updateAssetModel(assetExist, values);
        res.status(200).json({ message: `the asset with id ${asset_id}, was succesfully updated!`, result });
      } catch (error) {
        const CustomError = new HttpError(
          `Update assets failed. ${error}`,
          500
        );
        res.json({ errorMessage: CustomError.message, CustomError });
      }
};

const deleteAsset = async (req, res) => {
    try {
        const { asset_id } = req.params;
        await assetModel.deleteAssetModel(asset_id);
        res.status(200).json({ message: `the asset id: ${asset_id}, was deleted succesfully!` });
      } catch (error) {
        const CustomError = new HttpError(
          `Delete assets failed. Error: ${error}`,
          500
        );
        res.json({ errorMessage: CustomError.message, CustomError });
      }
};


module.exports= {
    getAllAssets, getAssetsByEmployeeId, getAssetById, createAsset, updateAsset, deleteAsset
}
// exports.getAllAssets = getAllAssets;
// exports.getAssetsByEmployeeId = getAssetsByEmployeeId;
// exports.getAssetById = getAssetById;
// exports.createAsset = createAsset;
// exports.createAsset = createAsset;
// exports.updateAsset = updateAsset;
// exports.deleteAsset = deleteAsset;
