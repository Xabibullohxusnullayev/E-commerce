import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  countInStock: { type: Number, default: 0 },
  imageUrl: String
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
