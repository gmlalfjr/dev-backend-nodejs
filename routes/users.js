var express = require("express");
var router = express.Router();
const {
  getAll,
  registerUser,
  loginUser,
  findById
} = require("../controller/UserController");
const { verifyToken } = require("../controller/Auth");
/* GET users listing. */
router.get("/", getAll);
router.get("/user", verifyToken, findById);
router.get("/create", getAll);
//router.get('/user', verifyToken,findById);
router.post("/register", registerUser);
router.post("/login", loginUser);
//router.get('/:id',verifyToken, findOneByid);

module.exports = router;
