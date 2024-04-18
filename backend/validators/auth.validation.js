const { body, validationResult } = require("express-validator");

const signupValid = [
    body("name", "Name is too short").isLength({ min: 5 }),
    body("username", "username to too short").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password to too short").isLength({ min: 5 }),
  ];

  const loginValid = [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 5 }),
  ];

  module.exports = {loginValid,signupValid}