const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateObjectDataCreate = [
  check("name").exists().notEmpty(),
  check("album").exists().notEmpty(),]