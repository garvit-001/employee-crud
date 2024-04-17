const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const JWT_SECRET = "nice@app";

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

module.exports = { signup };
