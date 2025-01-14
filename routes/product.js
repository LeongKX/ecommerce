const express = require("express");
const mongoose = require("mongoose");
//create a router for products
const router = express.Router();

const {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const { isValidUser, isAdmin } = require("../middleware/auth");
//the routes to get all the products(/products)
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page;
    const per_page = req.query.per_page;
    const products = await getProducts(category, page, per_page);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error._message);
  }
});

//get one product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send("Product not found");
    }
  } catch (error) {
    res.status(400).send({ error: error._message });
  }
});

//add product
//POST http://localhost:5555/products
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;
    console.log(req.body);
    if (!name || !price || !category) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }

    //pass in all the data to addNewProduct function
    const newProduct = await addNewProduct(
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

//update product
//PUT http://localhost:5555/products/fhuhfu
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

//delete product
//DELETE http://localhost:5555/products/afssgsgq
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({
      message: `Product with the provide id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

//get all products by category
// router.get("/:category", async (req, res) => {
//   const category = req.body.category;
//   const product = await getCategory(category);
//   res.status(200).send(product);
// });
module.exports = router;
