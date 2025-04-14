import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  profileImage: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  shopName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
  },

  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  password: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  listingPlan: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "blocked"],
    default: "pending",
  },
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
