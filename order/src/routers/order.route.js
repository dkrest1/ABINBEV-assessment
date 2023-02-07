import express from "express"
import {
    createOrder,
    updateOrder
} from "../controllers/order.controller.js"

const router = express.Router()
// create order endpoint
router.post("/create", createOrder)
// update order endpoint
router.patch("/update", updateOrder)

export default router