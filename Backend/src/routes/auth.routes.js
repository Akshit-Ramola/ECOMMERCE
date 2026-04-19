import { Router } from "express";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { register, login, googleCallback, getMe } from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticationUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5174/login" : "/login" }),
    googleCallback
)

/**
 * @description Get authenticated user's profile
 * @route GET /api/auth/me
 * @access Private
 */
router.get("/me", authenticationUser, getMe)

export default router;