// import de check, para validación de campos de solicitudes HTTP Post
const { check } = require("express-validator");
// import de validateResult, para manejar los resultados de la validación
const { validateResult } = require("../middleware/validator");

const validateCreateEmployee = [
  check("first_name")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 13 })
    .withMessage("firs name must have between 3 and 13 characters"),
  check("last_name")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 13 })
    .withMessage("last name must have between 3 and 13 characters"),
  check("cuit").exists().notEmpty().withMessage("cuit cannot be empty"),
  check("team_id")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("cuit cannot be empty. Is a numeric value only"),
  check("join_date")
    .exists()
    .notEmpty()
    .isISO8601()
    .withMessage("join date, cannot be empty. Format has to be YYYY-MM-DD"),
  check("rol").exists().notEmpty().withMessage("rol cannot be empty"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreateEmployee };
