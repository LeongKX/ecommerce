const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Happy coding!");
});

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/product_category");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.listen(5555, () => {
  console.log("Server is running ar http://localhost:5555");
});
