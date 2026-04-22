import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validator/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

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

/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.get('/', authenticateUser, getCart)

export default router;