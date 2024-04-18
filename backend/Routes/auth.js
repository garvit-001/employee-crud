const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validation");

router.post(
  "/createuser",
  fetchuser,
  authValidator.signupValid,
  authController.signup
);
router.post("/login", authValidator.loginValid, authController.loginUser);
router.post("/fetchuser", fetchuser, authController.fetchUser);

//Route 1 :  create a user using :POST "/api/auth/createuser",,, does not require auth
//Route 2 : Authenticate a user using :POST "/api/auth/createuser",,, does not require login
//Route 3 : Get user detail using :POST "/api/auth/getuser",,, require login
// fetchuser is a middleware to follow DRY principle

module.exports = router;

// todo
// refresh token