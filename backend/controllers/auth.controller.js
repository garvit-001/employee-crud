const User = require("../models/User"); // Import User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_SECRET = "nice@app";

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, errors: "Invalid credentials" });
    }

    // Compare entered password with stored hashed password
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success, errors: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
};

const signup = async (req, res) => {
    console.log(req.body);
    // if there are errors, return bad request and error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether user with the same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      // check if user exists already or not
      if (user) {
        return res.status(400).send({
          success,
          error: "Sorry, user with the same email already exists",
        });
      }
      // generate hashed password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
  
      // create a new user with provided data
      user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json("Some error occurred");
    }
  };

  

const fetchUser = async (req, res) => {
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
  };
module.exports = { loginUser, signup, fetchUser };
