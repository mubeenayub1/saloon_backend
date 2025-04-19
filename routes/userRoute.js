import express from "express";
import {
  register,
  login,
  getAllUsers,
  UpdateProfile,
  deleteCustomerById,
  UpdateStatus,
  getUserById,
  markFavorite,
  unmarkFavorite,
  getFavoriteVendors,
} from "../controller/userController.js";
// import AuthMiddleware from "../middleware/isAuth.js";
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
const userRoute = express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/getAll").get(getAllUsers);
userRoute.route("/get").get(authenticateToken, getUserById);
userRoute.route("/update").put(authenticateToken, UpdateProfile);
userRoute.route("/updateStatus/:id").put(UpdateStatus);
userRoute.route("/delete").delete(authenticateToken, deleteCustomerById);
userRoute
  .route("/markFavorite/:vendorId")
  .post(authenticateToken, markFavorite);
userRoute
  .route("/unmarkFavorite/:vendorId")
  .delete(authenticateToken, markFavorite);
userRoute.route("/getFavorite").get(authenticateToken, getFavoriteVendors);

// router.post("/mark/:vendorId", isAuthenticated, markFavorite);
// router.delete("/unmark/:vendorId", isAuthenticated, unmarkFavorite);
// router.get("/", isAuthenticated, getFavoriteVendors);

export default userRoute;
// 91867769407
