import mongoose from "mongoose";
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "blocked"],
    default: "pending",
  },
});

export const Service = mongoose.model("Service", serviceSchema);
