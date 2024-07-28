const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  getallUsers,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", getUser);
router.get("/getallusers", getallUsers)
router.get("/loggedin", loginStatus);
router.patch("/updateuser", updateUser);
router.patch("/changepassword", changePassword);

module.exports = router;