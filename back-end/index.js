import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import adminFeatureRoute from "./routes/admin/feature-routes.js";
import adminOrderRoute from "./routes/admin/order-routes.js";
import adminProductsRoute from "./routes/admin/products-routes.js";

import authRoute from "./routes/auth/auth-routes.js";

import shopAddressRoute from "./routes/shop/address-routes.js";
import shopCartRoute from "./routes/shop/cart-routes.js";
import shopOrderRoute from "./routes/shop/order-routes.js";
import shopProductsRoute from "./routes/shop/products-routes.js";
import shopReviewRoute from "./routes/shop/review-routes.js";
import shopSearchRoute from "./routes/shop/search-routes.js";

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
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/admin/feature", adminFeatureRoute);
app.use("/api/shop/products", shopProductsRoute);
app.use("/api/shop/cart", shopCartRoute);
app.use("/api/shop/address", shopAddressRoute);
app.use("/api/shop/order", shopOrderRoute);
app.use("/api/shop/search", shopSearchRoute);
app.use("/api/shop/review", shopReviewRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
