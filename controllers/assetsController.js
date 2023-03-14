//import de modulo constructor de errores, para su manejo
const HttpError = require("../models/httpError");

// falta import de modules
// falta import de validacion con express-validatos


const getAllAssets = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    const error = new HttpError("Error al realizar ", 404);

    return next(error);
  }
};

const getAssetsByEmployeeId = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    const error = new HttpError("Error al realizar ", 404);

    return next(error);
  }
};

const getAssetById = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    const error = new HttpError("Error al realizar ", 404);

    return next(error);
  }
};

const createAsset = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    const error = new HttpError("Error al realizar ", 404);

    return next(error);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    const error = new HttpError("Error al realizar ", 404);

    return next(error);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    const error = new HttpError("Error al realizar ", 404);

    return next(error);
  }
};

exports.getAllAssets = getAllAssets;
exports.getAssetsByEmployeeId = getAssetsByEmployeeId;
exports.getAssetById = getAssetById;
exports.createAsset = createAsset;
exports.createAsset = createAsset;
exports.updateAsset = updateAsset;
exports.deleteAsset = deleteAsset;
