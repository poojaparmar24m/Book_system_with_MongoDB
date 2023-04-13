const express = require("express");
const router = express.Router();
const {
  createBooks,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../Controller/Book_controller");

router.post("/", createBooks);

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.put("/editBook/:id", updateBookById);

router.delete("/deleteBook/:id", deleteBookById);

module.exports = router;
