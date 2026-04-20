import express from "express";
import { authenticationSeller } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, getSellerProducts, getProductDetails } from "../controllers/product.controller.js";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
});
const router = express.Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller)
 * @middleware authenticationSeller, createProductValidator, upload.array("images", 7)
 */
router.post("/", authenticationSeller, upload.array("images", 7), createProductValidator, createProduct)


/**
 * @route GET /api/products/seller
 * @desc Get all products by seller
 * @access Private (Seller)
 * 
 */
router.get("/seller", authenticationSeller, getSellerProducts)

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 * 
 */
router.get("/", getAllProducts)

/**
 * @route GET /api/products/:id
 * @desc Get product by id
 * @access Public
 * 
 */
router.get("/detail/:id", getProductDetails)
export default router;