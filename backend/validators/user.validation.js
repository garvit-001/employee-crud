const { body, validationResult } = require("express-validator");

const addUser = [
  body("age", "Age must be a number").isNumeric(),
  body("email", "Not a valid email").isEmail(),
];

module.exports = { addUser };
