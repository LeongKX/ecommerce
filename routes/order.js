const express = require("express");
// set up the order router
const router = express.Router();
// import all the order functions
const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// create new order
router.post("/", async (req, res) => {
  try {
    // const customerName = req.body.customerName;
    // const customerEmail = req.body.customerEmail;
    // const products = req.body.products;
    // const totalPrice = req.body.totalPrice;
    const {
      customerName = "",
      customerEmail = "",
      products = [],
      totalPrice = 0,
    } = req.body;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice
    );
    console.log(newOrder.billplz_url);
    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error.response.data.error);
    res.status(400).send({
      error: error._message,
    });
  }
});

//get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error._message);
  }
});

module.exports = router;

//delete order
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOrder(id);
    res.status(200).send({
      message: `Product with the provide id #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

//update order status
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedOrder = await updateOrder(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});