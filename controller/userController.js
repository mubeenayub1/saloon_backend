import { catchAsyncError } from "../middleware/catchAsyncError.js";
// import { Customer } from "../model/customer.js";
import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});
// register user
export const register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email already exist", status: "fail" });
  } else {
    const newUser = await User.create(data);
    const token = jwt.sign(
      {
        userId: newUser._id.toString(),
      },
      "somesecretsecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data: newUser,
      token: token,
    });
  }
});

// login user
export const login = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Email not exist", status: "fail" });
    }
    const user = await User.findOne({ email, password });
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "somesecretsecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      message: "User login successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// get user by id
export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await User.findById(id);

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Update Profile
export const UpdateProfile = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const userId = req?.user?.userId;

  const updatedUser = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "user updated successfully!",
  });
});

export const UpdateStatus = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const userId = req.params.id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { status: data?.status },
    {
      new: true,
    }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "user status updated successfully!",
  });
});

// Get All User
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});
// delet user
export const deleteCustomerById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCustomer = await User.findByIdAndDelete(id);
    if (!delCustomer) {
      return res.json({ status: "fail", message: "Customer not Found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
