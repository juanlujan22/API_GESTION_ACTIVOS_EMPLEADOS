//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// import del model de assets
const assetModel = require("../models/assetModel");
const employeeModel = require("../models/employeeModel");

// trae todos los assets, con paginado de a 5 resultados o según valor ingresado en query
const getAllAssets = async (req, res) => {
  try {
    //recibo querys, para implementar paginado
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit;

    const resultado = await assetModel.getAllAssetsModel(limit, offset);
    res.json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      `Fetching assets failed. Error: ${error}`,
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

//trae assets de un empleado, mediante employe_id
const getAssetsByEmployeeId = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const result = await assetModel.getAssetsByEmployeeId(employee_id);
    // si asset no existe, devuelve error
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "that employee does not have any assets" });
    }

    res.json({ data: result });
  } catch (error) {
    const CustomError = new HttpError(
      `Fetching assets failed. Error: ${error}`,
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

//trae un solo asset mediante asset_id
const getAssetById = async (req, res) => {
  try {
    const { asset_id } = req.params;
    const resultado = await assetModel.getAssetByIdModel(asset_id);
    // si asset no existe, devuelve error
    if (resultado.length === 0) {
      return res.status(404).json({ message: "asset not exist" });
    }

    res.status(200).json({ data: resultado });
  } catch (error) {
    const CustomError = new HttpError(
      `Fetching assets failed. Error: ${error}`,
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

// creacion de un nuevo asset
const createAsset = async (req, res) => {
  try {
    const values = { ...req.body };
    const emplExist = await employeeModel.getEmployeeByIdModel(
      values.employee_id
    );
    //si no existe el employee id a editar, devuelve error
    if (emplExist.length == 0) {
      return res.status(404).json({ message: "that employee does not exist" });
    }

    const result = await assetModel.createAssetModel(values);
    res.status(201).json({ data: result });
  } catch (error) {
    const CustomError = new HttpError(
      `Creating assets failed, ERROR ${error}`,
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
//que exista el id del asset, como el empleado
const updateAsset = async (req, res) => {
  try {
    const { asset_id } = req.params;
    const assetExist = await assetModel.getAssetByIdModel(asset_id);
    //verifico si existe el asset id a editar, si no error
    if (assetExist.length == 0) {
      return res.status(404).json({ message: "that asset does not exist" });
    }

    const values = { ...req.body };
    const emplExist = await employeeModel.getEmployeeByIdModel(
      values.employee_id
    );
    //verifico si existe el employee id a editar, si no error
    if (emplExist.length == 0) {
      return res.status(404).json({ message: "that employee does not exist" });
    }

    const result = await assetModel.updateAssetModel(assetExist, values);
    res
      .status(200)
      .json({
        message: `the asset with id ${asset_id}, was succesfully updated!`,
        result,
      });
  } catch (error) {
    const CustomError = new HttpError(`Update assets failed. ${error}`, 500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};
// elimina empleado
const deleteAsset = async (req, res) => {
  try {
    const { asset_id } = req.params;
    const assetExist = await assetModel.getAssetByIdModel(asset_id);
    // si asset no existe, devuelve error
    if (assetExist.length == 0) {
      return res.status(404).json({ message: "that asset does not exist" });
    }
    await assetModel.deleteAssetModel(asset_id);
    res
      .status(200)
      .json({ message: `the asset id: ${asset_id}, was deleted succesfully!` });
  } catch (error) {
    const CustomError = new HttpError(
      `Delete assets failed. Error: ${error}`,
      500
    );
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

module.exports = {
  getAllAssets,
  getAssetsByEmployeeId,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
};
