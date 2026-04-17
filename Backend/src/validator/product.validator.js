import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Valudation error", errors: errors.array() })
    }

    next();
}

export const createProductValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("priceAmount").trim().notEmpty().withMessage("Price amount is required"),
    body("priceCurrency").trim().notEmpty().withMessage("Price currency is required"),
    body("images").isArray().withMessage("Images must be an array"),
    validateRequest
]