import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import adminProductsRoute from "./routes/admin/products-routes.js";
import authRoute from "./routes/auth/auth-routes.js";

dotenv.config();
mongoose
  .connect(
    "mongodb+srv://nguyennhutphong:xsamkok186@cluster0.bp3ko.mongodb.net/"
  )
  .then(() => console.log("Mongodb connected successfully"))
  .catch((error) => console.log(error));
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminProductsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
