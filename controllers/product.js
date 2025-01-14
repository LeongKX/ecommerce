const Product = require("../models/product");

//get all products
const getProducts = async (category, page = 1, per_page = 6) => {
  let filter = {};
  if (category) {
    filter.category = category;
  }
  const products = await Product.find(filter)
    .populate("category")
    .limit(per_page)
    .skip((page - 1) * per_page)
    .sort({ _id: -1 });
  return products;
};

//get one product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

//add new product
const addNewProduct = async (name, description, price, category, image) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    image,
  });
  await newProduct.save();
  return newProduct;
};

//update product
const updateProduct = async (id, name, description, price, category, image) => {
  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
      image,
    },
    { new: true }
  );
  return updateProduct;
};

//delete product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

//get all products by category
const getCategory = async (category) => {
  if (category != "") {
    const product = await Product.find({ category: category });
    return product;
  } else {
    const product = await Product.find();
    return product;
  }
};

module.exports = {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getCategory,
};
