const bookModel = require("../Model/Book_model");

exports.createBooks = async (req, res) => {
  try {
    const { name, author, price, genre, publisher } = req.body;

    const newBook = await bookModel.create({
      name,
      author,
      price,
      genre,
      publisher,
    });

    return res.status(201).json({
      Success: true,
      Meassage: "Book Created SuccessFully !",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server Error !" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await bookModel.find();
    if (!allBooks) {
      return res.status(404).json({
        Success: false,
        Meassage: "books are not avalible !",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Get All Books !",
      data: allBooks,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server Error !" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const getbook = await bookModel.findById({ _id: id });
    if (!getbook) {
      return res.status(404).json({
        Success: false,
        Message: "Book Not Exits with This Id !",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Book Found with This Id !",
      data: getbook,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error !" });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(404).json({
        Success: false,
        Message: "No Data To Add a Book",
      });
    }

    const updateData = await bookModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );

    if (!updateData) {
      return res.status(404).json({
        Success: false,
        Message: "Book Id does not Exits to update a data !",
      });
    }
    return res.status(200).json({
      Success: true,
      Message: "Update a book successFully ! ",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error !" });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await bookModel.findByIdAndDelete({ _id: id });
    if (!deleteData) {
      return res.status(404).json({
        Success: false,
        Message: "Book Not Exits to delete a data !",
      });
    }
    return res.status(200).json({
      Success: true,
      Message: "Delete a Book successfully !",
      data: deleteData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error !" });
  }
};
