import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validator/cart.validator.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = express.Router();


/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart
 * @access Private
 * @argument productId - ID of the product
 * @argument variantId - ID of the variant
 * @argument quantity - Quantity of the item to add
 */
router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)

export default router;