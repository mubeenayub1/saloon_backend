import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import userRoute from "./routes/userRoute.js";
import vendorRoute from "./routes/vendorRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
connectDB();
import { createServer } from "http";
// Use Middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  fileupload({
    useTempFiles: true,
  })
);
const server = createServer(app);

app.use("/user", userRoute);
app.use("/vendor", vendorRoute);
app.use("/service", serviceRoute);

app.get("/", async (req, res) => {
  res.send("App Is Running");
});
server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port 4000`);
});

app.use(ErrorMiddleware);
