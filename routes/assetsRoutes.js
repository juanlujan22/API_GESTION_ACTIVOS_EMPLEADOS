//import de dependencias
const assetRouter = require("express").Router();
// controllers
const {
  getAllAssets,
  getAssetsByEmployeeId,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetsController");
//  validator
const { validateCreateAsset, validateUpdateAsset } = require("../validators/assetsValidators");

// ruta para obtener todos los activos
assetRouter.get("/", getAllAssets);
// ruta para obtener activo segun id de empleado
assetRouter.get("/empid/:employee_id", getAssetsByEmployeeId);
// ruta para obtener un solo activos segun id de asset
assetRouter.get("/:asset_id", getAssetById);
// ruta para crear un nuevo activos
assetRouter.post("/create", validateCreateAsset, createAsset);
// ruta para actualizar un activos
assetRouter.put("/update/:asset_id", validateUpdateAsset, updateAsset);
// ruta para eliminar un activos
assetRouter.delete("/delete/:asset_id", deleteAsset);

//export
module.exports = assetRouter;
