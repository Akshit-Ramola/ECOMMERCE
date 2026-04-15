import express from "express";
import { authenticationSeller } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", authenticationSeller, createProduct)

export default router;