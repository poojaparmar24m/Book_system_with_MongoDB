const express = require("express");
const {
  createUser,
  getAllUser,
  getUserByid,
  deleteUserById,
  updateUserById,
  getSubcriptionDetail,
} = require("../Controller/User_controller");
const router = express.Router();

router.get("/", getAllUser);

router.post("/", createUser);

router.get("/:id", getUserByid);

router.delete("/deleteuser/:id", deleteUserById);

router.put("/edituser/:id", updateUserById);

router.get("/subscription_details/:id", getSubcriptionDetail);

module.exports = router;
