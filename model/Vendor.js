import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  video: {
    type: String,
  },
  surname: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  age: {
    type: String,
  },
  cnic: {
    type: String,
  },
  license: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  title: {
    type: String,
  },
  shopName: {
    type: String,
  },
  description: {
    type: String,
  },
  userName: {
    type: String,
    require: true,
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
  locationAddres: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
    enum: ["on", "off"],
    default: "off",
  },
  listingPlan: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
  status: {
    type: String,
    enum: ["offline", "online"],
    default: "offline",
  },
  accountStatus: {
    type: String,
    enum: ["pending", "approved", "blocked"],
    default: "pending",
  },
  openingTime: {
    weekdays: {
      from: { type: String }, // e.g. "08:00 AM"
      to: { type: String }, // e.g. "09:30 PM"
    },
    weekends: {
      from: { type: String }, // e.g. "09:00 AM"
      to: { type: String }, // e.g. "01:00 PM"
    },
  },
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
