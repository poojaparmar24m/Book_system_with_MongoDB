const express = require("express");
const { createUser, getAllUser } = require("../Controller/User_controller");
const router = express.Router();

router.get("/", getAllUser);

router.post("/", createUser);

module.exports = router;
