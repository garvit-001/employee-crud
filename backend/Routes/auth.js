const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const {signup} = require("../controllers/signup");
const {loginUser} = require('../controllers/login');

const JWT_SECRET = "nice@app";

//Route 1 :  create a user using :POST "/api/auth/createuser",,, does not require auth
router.post(
  "/createuser",
  fetchuser,
  [
    body("name", "Name is too short").isLength({ min: 5 }),
    body("username", "username to too short").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password to too short").isLength({ min: 5 }),
  ],
  signup
);

//Route 2 : Authenticate a user using :POST "/api/auth/createuser",,, does not require login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 5 }),
  ],
 loginUser
);
//Route 3 : Get user detail using :POST "/api/auth/getuser",,, require login

// fetchuser is a middleware to follow DRY principle
router.post("/fetchuser", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ errors: "Enter valid credentials" });
    }
    res.send(user);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json("Internal server error");
  }
});


// todo
// refresh token

module.exports = router;
