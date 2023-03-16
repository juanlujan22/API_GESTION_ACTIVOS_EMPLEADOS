const { check } = require("express-validator");
const { validateResult } = require("../middleware/validator");
const validateCreateAsset = [
  check("name").exists().notEmpty(),
  check("type").exists().notEmpty(),
  check("code").exists().notEmpty(),
  check("marca").exists().notEmpty(),
  check("purchase_date").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports= {validateCreateAsset}