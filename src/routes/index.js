import express from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import productRoutes from "../modules/products/products.routes.js";
import orderRoutes from "../modules/orders/orders.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;