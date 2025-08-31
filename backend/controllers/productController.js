import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// CREATE product (admin only)
export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// UPDATE product
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE product
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
