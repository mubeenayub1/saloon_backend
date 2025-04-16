import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Service } from "../model/Service.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});

export const Create = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  let updatedFields = { ...data };

  if (req.files && req.files.image) {
    let image = req.files.image;

    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images",
    });

    updatedFields.image = result.secure_url;
  } else {
    return res
      .status(400)
      .json({ message: "Please select service image", status: "fail" });
  }
  const newService = await Service.create(updatedFields);
  res.status(200).json({
    status: "success",
    message: "Service created successfully",
    data: newService,
  });
});

export const getServiceById = async (req, res, next) => {
  const id = req?.params?.serviceId;
  try {
    const data = await Service.findById(id);

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateService = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const serviceId = req?.params?.serviceId;
  let updatedFields = { ...data };
  if (req.files && req.files.image) {
    let image = req.files.image;

    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "images",
    });

    updatedFields.image = result.secure_url;
  }
  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
    updatedFields,
    {
      new: true,
    }
  );

  if (!updatedService) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedService,
    message: "Service updated successfully!",
  });
});

export const getAllService = catchAsyncError(async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      status: "success",
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});

export const deleteServiceById = async (req, res, next) => {
  const id = req?.params?.serviceId;
  try {
    const delService = await Service.findByIdAndDelete(id);
    if (!delService) {
      return res.json({ status: "fail", message: "Service not Found" });
    }
    res.json({
      status: "success",
      message: "Service deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
