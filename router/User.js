const express = require("express");
const {
  createUser,
  getAllUser,
  getUserByid,
  deleteUserById,
  updateUserById,
} = require("../Controller/User_controller");
const router = express.Router();

router.get("/", getAllUser);

router.post("/", createUser);

router.get("/:id", getUserByid);

router.delete("/deleteuser/:id", deleteUserById);

router.put("/edituser/:id", updateUserById);

module.exports = router;
