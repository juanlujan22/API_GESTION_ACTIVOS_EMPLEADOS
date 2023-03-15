//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// falta import de modules
// falta import de validacion con express-validatos
const assetModel=require("../models/assetModel")

const getAllAssets = async (req, res) => {
    try {
        const resultado = await assetModel.getAllAssetsModel();
        res.json({ data: resultado });
      } catch (error) {
        const CustomError = new HttpError(
          "Fetching employees failed, please try again.",
          500
        );
        res.json({ errorMessage: CustomError.message, CustomError });
      }
};

const getAssetsByEmployeeId = async (req, res) => {
  const employee_id=req.params.employee_id;
  const  result = await assetModel.getAssetsByEmployeeId(employee_id);
  res.json({data:  result});
};


// no anda, se queda colgado
const getAssetById = async (req, res) => {
  const  asset_id  = req.params.asset_id;
  const resultado = await assetModel.getAssetByIdModel(asset_id);
  res.status(200).json({ data: resultado });
    // try {
    //   } catch (error) {
    //     const CustomError = new HttpError(
    //       "Fetching employee failed, please try again.",
    //       500
    //     );
    //     res.json({ errorMessage: CustomError.message, CustomError });
    //   }
};

const createAsset = async (req, res) => {
    try {
        const values = { ...req.body };
        const result = await assetModel.createAssetModel(values);
        res.status(201).json({ data: result });
      } catch (error) {
        console.log(error)
        const CustomError = new HttpError(`Creating Asset failed, ERROR ${error}`, 400);
        res.json({errorMessage : CustomError.message, CustomError});
    }
};

const updateAsset = async (req, res) => {
    try {
        const values = { ...req.body };
        const { asset_id } = req.params;
        const result = await assetModel.updateAssetModel(asset_id, values);
        res.status(200).json({ message: "the employee was succesfully updated!", result });
      } catch (error) {
        const CustomError = new HttpError(
          `Update employee failed, please try again. Error: ${error}`,
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
          `Delete employee failed. ${error}`,
          401
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
