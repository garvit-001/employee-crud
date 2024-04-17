const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");


const JWT_SECRET = "nice@app";

const addUser = async (req, res) => {
    try {
      // console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("failed 0");
        return res.status(400).json({ errors: errors.array() });
      }
      const { first, last, age, DOB, department, email } = req.body;
      // console.log(req.body);
      const newUser = new Employee({
        admin: req.user.id,
        first,
        last,
        age,
        DOB,
        department,
        email,
      });

      const savedUser = await newUser.save();
      console.log(savedUser);
      res.status(200).json(savedUser);
      // res.json(savedUser, (success = true));
    } catch (error) {
      // console.log("failed");
      console.log(error.message);
      res.status(500).json("Some error occurred");
    }
  }

  module.exports = {addUser};