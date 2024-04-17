const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Employee = require("../models/Employee");
const { addUser } = require("../controllers/addUser");
const { updateUser } = require("../controllers/updateUser");
const { deleteUser } = require("../controllers/deleteUser");
// cosnt {fetchEmployee} = require('../controllers/fetchEmployee')

//Route 1 : Get notes corresponding to a user using :GET "/api/notes/fetchallnotes",,, require login
router.get("/fetchallemployees", fetchuser, async (req, res) => {
  try {
    const employees = await Employee.find({ admin: req.user.id });
    // console.log(employees);
    res.send(employees);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json("Some error occured");
  }
});

//Route 2 : Add notes using :POST "/api/notes/addnotes",,, require login
router.post(
  "/adduser",
  fetchuser,
  [
    body("age", "Age must be a number").isNumeric(),
    body("email", "Not a valid email").isEmail(),
  ],
  addUser
);

//Route 3 : upadate notes using :PUT "/api/notes/updatenote",,, require login
router.put("/updateuser/:id", fetchuser, updateUser);

//Route 4 : Delete a note using :DELETE "/api/notes/deletenote",,, require login
router.delete("/deleteuser/:id", fetchuser, deleteUser);

module.exports = router;
