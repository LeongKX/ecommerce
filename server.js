require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//create the express app
const app = express();

//middleware to handle JSON request
app.use(express.json());

//setup cors policy
app.use(cors());

//set a folder as a static path
app.use("/api/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/api", (req, res) => {
  res.send("Happy coding!");
});

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/product_category");

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", require("./routes/order"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/auth", require("./routes/user"));
app.use("/api/image", require("./routes/image"));

app.listen(5555, () => {
  console.log("Server is running ar http://localhost:5555");
});
