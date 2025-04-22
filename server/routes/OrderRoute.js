import express from "express";
import { createOrder, customerOrder, getSingleOrder, orders } from "../controllers/OrderController.js";
import auth from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();


// create order
router.post("/",auth, createOrder);
// all orders
router.get("/all-orders", auth , restrict("admin"),orders);
// orders by customer
router.get("/customer-order",auth,customerOrder);
// single order route
router.get("/:orderId",auth, getSingleOrder )

export default router;