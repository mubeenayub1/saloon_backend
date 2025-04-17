import { catchAsyncError } from "../middleware/catchAsyncError.js";
// import { SubCategory } from "../model/SubCategory.js";
import { Category } from "../model/Category.js";

import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});

// create Category
export const createCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  let updatedFields = { ...data };

  if (req.files && req.files.image) {
    let image = req.files.image;

    // Uploading to Cloudinary folder "my_app/images"
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images", // change this to your desired folder path
    });

    updatedFields.image = result.secure_url; // it's better to use secure_url
  }
  const newCategory = await Category.create(updatedFields);
  res.status(200).json({
    status: "success",
    message: "New Category created successfully!",
    data: newCategory,
  });
});

// get Category by id
export const getCategoryById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await Category.findById(id);

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
};
// update Category
export const updateCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const categoryId = req?.params.categoryId;
  let updatedFields = { ...data };

  if (req.files && req.files.image) {
    let image = req.files.image;

    // Uploading to Cloudinary folder "my_app/images"
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images", // change this to your desired folder path
    });

    updatedFields.image = result.secure_url; // it's better to use secure_url
  }
  const updatedSubCategory = await Category.findByIdAndUpdate(
    categoryId,
    updatedFields,
    {
      new: true,
    }
  );
  if (!updatedSubCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedSubCategory,
    message: "Category updated successfully!",
  });
});

// Get All SubCategory
export const getAllCategory = catchAsyncError(async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});

// delete Category
export const deleteCategoryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCategory = await Category.findByIdAndDelete(id);
    if (!delCategory) {
      return res.json({ status: "fail", message: "Category not Found" });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
