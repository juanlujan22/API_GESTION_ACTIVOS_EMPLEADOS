//dependencias
const express = require('express');
const router = express.Router();
// import de controllers
const assetsController = require('../controllers/assetsController')


// ruta para obtener todos los activos
router.get('/', assetsController.getAllAssets)
// ruta para obtener un solo activos
router.get('/:employeeid', assetsController.getAssetsByEmployeeId)
// ruta para obtener un solo activos
router.get('/:assetid', assetsController.getAssetById)
// ruta para crear un nuevo activos
router.post('/create', assetsController.createAsset)
// ruta para actualizar un activos
router.put('/:assetid', assetsController.updateAsset)
// ruta para eliminar un activos
router.delete('/:assetid', assetsController.deleteAsset)

//export 
module.exports = router;