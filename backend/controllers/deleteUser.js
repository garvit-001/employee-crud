const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");

const JWT_SECRET = "nice@app";

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
  }
  module.exports = {deleteUser};