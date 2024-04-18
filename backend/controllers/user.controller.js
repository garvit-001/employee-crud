const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");
const User = require("../models/User");

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
  };


  const deleteUser =async (req, res) => {
    try {
      // if therenare error, return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // find note for that id,,, if not found return ,, if user is not same return
      let employee = await Employee.findById(req.params.id);
      // console.log(employee.admin, req.user.id);
      if (!employee) {
        return res.status(404).send("not found");
      }
      if (employee.admin.toString() !== req.user.id) {
        return res.status(401).send("Access Denied");
      }
  
      // console.log("e2:", employee);
      // otherwise update the employee as new employee and send employee as res
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ success: "note deleted successfully", data: employee });
    } catch (error) {
      // console.log(error.message);
      res.status(500).json("Some error occured");
    }
  };
  const fetchallemployee = async (req, res) => {
    try {
      const employees = await Employee.find({ admin: req.user.id });
      // console.log(employees);
      res.send(employees);
    } catch (error) {
      // console.log(error.message);
      res.status(500).json("Some error occured");
    }
  };


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
  };
  module.exports = {addUser, deleteUser, fetchallemployee, updateUser};