const userModel = require("../Model/User_model");

exports.getAllUser = async (req, res) => {
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
