import express from "express";

import {
  registerVendor,
  loginVendor,
  getAllVendor,
  getVendorById,
  deleteVendorById,
  UpdateProfile,
  UpdateStatus,
} from "../controller/vendorController.js";

import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "somesecretsecret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
const vendorRoute = express.Router();

vendorRoute.route("/register").post(registerVendor);
vendorRoute.route("/login").post(loginVendor);
vendorRoute.route("/getAll").get(getAllVendor);
vendorRoute.route("/get").get(authenticateToken, getVendorById);
vendorRoute.route("/update").put(authenticateToken, UpdateProfile);
vendorRoute.route("/updateStatus/:id").put(UpdateStatus);
vendorRoute.route("/delete").delete(authenticateToken, deleteVendorById);

export default vendorRoute;
// 91867769407
