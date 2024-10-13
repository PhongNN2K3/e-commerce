import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    size: [String],
    colors: [
      {
        hexCode: String,
        image: String, // Store the image URL
        fileName: String, // Store the file name
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
