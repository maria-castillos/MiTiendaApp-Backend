import express from "express";
import {
    createOrderController,
    getMyOrdersController,
    getOrderDetailsController
} from "../controllers/orderController.js";

import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/orders", authMiddleware, createOrderController);
router.get("/orders", authMiddleware, getMyOrdersController);
router.get("/orders/:id", authMiddleware, getOrderDetailsController);

export default router;
