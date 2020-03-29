var express = require("express");
var router = express.Router();
const {
  getAll,
  registerUser,
  loginUser
} = require("../controller/UserController");
const { verifyToken } = require("../controller/Auth");
/* GET users listing. */
const EmployeeControl = require("../controller/EmployeeController");

router.get("/", verifyToken, EmployeeControl.getAllEmployee);
router.get("/get/:id", verifyToken, EmployeeControl.findOneEmployee);

router.post("/add", verifyToken, EmployeeControl.addEmployee);
router.put("/update/:id", verifyToken, EmployeeControl.findOneEdit);
router.delete("/delete/:id", verifyToken, EmployeeControl.findDelete);
module.exports = router;
