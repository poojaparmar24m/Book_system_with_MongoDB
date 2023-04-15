const userModel = require("../Model/User_model");
// const bookModel = require("../Model/Book_model");

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
  try {
    const {
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
      issuedBook,
      issuedDate,
      returnDate,
    } = req.body;
    console.log("BODY", req.body);
    const Newuser = await new userModel({
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
      issuedBook,
      issuedDate,
      returnDate,
    }).save();
    console.log("isseued", Newuser);
    return res.status(201).json({
      Success: true,
      Message: "User Created Successfully ! ",
      data: Newuser,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getUserByid = async (req, res) => {
  try {
    const { id } = req.params;
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

    if (!data) {
      return res.status(404).json({
        Success: false,
        Message: "No Data To Add a User !",
      });
    }

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

exports.getSubcriptionDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriptionData = await userModel.findById({ _id: id });

    if (!subscriptionData) {
      return res.status(404).json({
        Success: false,
        Message: "User Not Exits With Id",
      });
    }
    const getDays = (data = null) => {
      const date = data ? new Date(data) : new Date();
      return Math.floor(date / (1000 * 60 * 60 * 24));
    };

    const subscriptionType = (date) => {
      if (subscriptionData.subscriptionType === "Basic") {
        date = date + 90;
      } else if (subscriptionData.subscriptionType === "Standard") {
        date = date + 180;
      } else if (subscriptionData.subscriptionType === "Premium") {
        date = date + 365;
      }
      return date;
    };

    let returnDate = getDays(subscriptionData.returnDate);
    let currentDate = getDays();
    let subscriptionDate = getDays(subscriptionData.subscriptionDate);
    let subscriptionexpiraion = subscriptionType(subscriptionDate);
    console.log("return date", returnDate);
    console.log("current date", currentDate);
    console.log("subscription date", subscriptionDate);
    console.log("subscription expire", subscriptionexpiraion);

    const data = {
      ...subscriptionData,
      subscriptionExpired: subscriptionexpiraion < currentDate,
      dayLeftforExpiration:
        subscriptionexpiraion <= currentDate
          ? 0
          : subscriptionexpiraion - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionexpiraion <= currentDate
            ? 100
            : 50
          : 0,
    };

    return res.status(200).json({
      Success: true,
      Message: "Get subscription details ! ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
