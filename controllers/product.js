const Product = require("../models/product");

//get all products
const getProducts = async (category) => {
  let filter = {};
  if (category) {
    filter.category = category;
  }
  const product = await Product.find(filter);
  return product;
};

//get one product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

//add new product
const addNewProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
};

//update product
const updateProduct = async (id, name, description, price, category) => {
  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
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
  const product = await Product.find(category);
  return product;
};



module.exports = {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getCategory,
};
