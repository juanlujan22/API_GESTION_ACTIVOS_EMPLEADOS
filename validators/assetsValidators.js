//imports
const { check } = require("express-validator");
const { validateResult } = require("../middleware/validator");
// validacion de parametros del create
const validateCreateAsset = [
  check("name")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("name must have between 3 and 10 characters"),
  check("type")
  .exists()
  .notEmpty()
  .withMessage("type cannot be empty"),
  check("code")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("code is only a number, cannot be empty"),
  check("marca")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("marca cannot be empty. Must have between 3 and 10 characters"),
  check("purchase_date")
    .exists()
    .notEmpty()
    .isISO8601()
    .withMessage("purchase date, cannot be empty. Format has to be YYYY-MM-DD"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreateAsset };
