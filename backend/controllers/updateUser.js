const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");


const JWT_SECRET = "nice@app";

const updateUser =async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Extract fields from request body
      const { first, last, email, age, DOB, department } = req.body;
      const newEmployee = {};
  
      // Populate newUser object with provided fields
      if (first) {
        newEmployee.first = first;
      }
      if (last) {
        newEmployee.last = last;
      }
      if (email) {
        newEmployee.email = email;
      }
      if (age) {
        newEmployee.age = age;
      }
      if (DOB) {
        newEmployee.DOB = DOB;
      }
      if (department) {
        newEmployee.department = department;
      }
  
      // Find the user by ID
      let employee = await Employee.findById(req.params.id);
      // console.log(employee);
      if (!employee) {
        return res.status(404).send("User not found");
      }
      if (employee.admin.toString() !== req.user.id) {
        return res.status(401).send("Access Denied");
      }
  
      // Update the user details
      employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { $set: newEmployee },
        { new: true }
      );
      if (!employee) {
        return res.status(404).send("User not found"); // Handle case where user is not found after update
      }
  
      // Send the updated user details as response
      res.json(employee);
    } catch (error) {
      console.error(error.message); // Log the error message for debugging
      res.status(500).json("Some error occurred");
    }
  }

  module.exports = {updateUser}
  