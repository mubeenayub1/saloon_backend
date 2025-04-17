import { catchAsyncError } from "../middleware/catchAsyncError.js";
// import { Customer } from "../model/customer.js";
import { User } from "../model/User.js";
import { Vendor } from "../model/Vendor.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});
// register user
export const registerVendor = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await Vendor.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email already exist", status: "fail" });
  } else {
    let updatedFields = { ...data };

    if (req.files && req.files.profileImage) {
      let image = req.files.profileImage;

      // Uploading to Cloudinary folder "my_app/images"
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "images", // change this to your desired folder path
      });

      updatedFields.profileImage = result.secure_url; // it's better to use secure_url
    }
    const newUser = await Vendor.create(updatedFields);
    const token = jwt.sign(
      {
        userId: newUser._id.toString(),
      },
      "somesecretsecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      message: "Vendor registered successfully",
      data: newUser,
      token: token,
    });
  }
});

// login user
export const loginVendor = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Vendor.findOne({ email, password });
    if (!existingUser) {
      res.status(400).json({ message: "User not exist", status: "fail" });
    }
    const user = await Vendor.findOne({ email, password });
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "somesecretsecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      message: "Vendor login successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// get user by id
export const getVendorById = async (req, res, next) => {
  const id = req?.user?.userId;
  try {
    const data = await Vendor.findById(id);

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
  let updatedFields = { ...data };

  if (req.files && req.files.profileImage) {
    let image = req.files.profileImage;

    // Uploading to Cloudinary folder "my_app/images"
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images", // change this to your desired folder path
    });

    updatedFields.profileImage = result.secure_url; // it's better to use secure_url
  }
  const updatedUser = await Vendor.findByIdAndUpdate(userId, updatedFields, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "vendor updated successfully!",
  });
});
export const ProfileSetup = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const userId = req?.user?.userId;
  let updatedFields = { ...data };

  if (req.files && req.files.cnic) {
    let image = req.files.cnic;

    // Uploading to Cloudinary folder "my_app/images"
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images", // change this to your desired folder path
    });

    updatedFields.cnic = result.secure_url; // it's better to use secure_url
  } else {
    return res.status(400).json({ message: "Please upload cnic" });
  }
  if (req.files && req.files.license) {
    let image = req.files.license;

    // Uploading to Cloudinary folder "my_app/images"
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images", // change this to your desired folder path
    });

    updatedFields.license = result.secure_url; // it's better to use secure_url
  } else {
    return res.status(400).json({ message: "Please upload license" });
  }

  const updatedUser = await Vendor.findByIdAndUpdate(userId, updatedFields, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "vendor updated successfully!",
  });
});
export const UpdateStatus = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const userId = req?.user?.userId;

  const updatedUser = await Vendor.findByIdAndUpdate(
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
    message: "vendor status updated successfully!",
  });
});

// Get All User
export const getAllVendor = catchAsyncError(async (req, res, next) => {
  try {
    const users = await Vendor.find();
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
export const deleteVendorById = async (req, res, next) => {
  const id = req?.user?.userId;
  try {
    const delCustomer = await Vendor.findByIdAndDelete(id);
    if (!delCustomer) {
      return res.json({ status: "fail", message: "Vendor not Found" });
    }
    res.json({
      status: "success",
      message: "Vendor deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
