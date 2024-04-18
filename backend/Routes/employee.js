const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validation");

router.get("/fetchallemployees", fetchuser, userController.fetchallemployee);

router.post(
  "/adduser",
  fetchuser,
  userValidator.addUser,
  userController.addUser
);

router.put("/updateuser/:id", fetchuser, userController.updateUser);
router.delete("/deleteuser/:id", fetchuser, userController.deleteUser);

module.exports = router;

//Route 1 : Get notes corresponding to a user using :GET "/api/notes/fetchallnotes",,, require login
//Route 3 : upadate notes using :PUT "/api/notes/updatenote",,, require login
//Route 2 : Add notes using :POST "/api/notes/addnotes",,, require login
//Route 4 : Delete a note using :DELETE "/api/notes/deletenote",,, require login
