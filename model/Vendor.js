import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  gallery: {
    type: Array,
  },
  video: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  age: {
    type: String,
    require: true,
  },
  cnic: {
    type: String,
    require: true,
  },
  license: {
    type: String,
    require: true,
  },
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
  locationAddres: {
    type: String,
  },
  phone: {
    type: String,
    require: true,
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
      from: { type: String, required: true },  // e.g. "08:00 AM"
      to: { type: String, required: true },    // e.g. "09:30 PM"
    },
    weekends: {
      from: { type: String, required: true },  // e.g. "09:00 AM"
      to: { type: String, required: true },    // e.g. "01:00 PM"
    },
  },
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
