const userModel = require("../Model/User_model");

exports.getAllUser = async (req, res) => {
  try {
    const userData = await userModel.find();

    if (!userData) {
      return res.status(404).json({
        Success: false,
        Message: "User Data Not avalible ! ",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Get All User Info !",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.createUser = async (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const Newuser = await userModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    Success: true,
    Message: "User Created Successfully ! ",
    data: Newuser,
  });
};

exports.getUserByid = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await userModel.findById({ _id: id });

    if (!userData) {
      return res.status(404).json({
        Success: false,
        Message: "User Not Exits with This Id !",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Get User by their Id",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await userModel.deleteOne({ _id: id });
    if (!deleteData) {
      return res.status(404).json({
        Success: false,
        Message: "User Not Exist !",
      });
    }

    res.status(200).json({
      Success: true,
      Message: "user Delete successfully !",
      data: deleteData,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const updateData = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    );

    if (!updateData) {
      return res.status(404).json({
        Success: false,
        Message: "User Not Exits !",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "User updated succesfully !",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
