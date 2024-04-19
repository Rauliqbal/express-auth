import express from "express";
import { Login, Register } from "../controllers/auth.js";
import { check } from "express-validator";
import Validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("full_name")
    .not()
    .isEmpty()
    .withMessage("Fullname is required")
    .trim()
    .escape(),
  check("username")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("username must have 8 words"),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must have 8 words"),
  Validate,
  Register
);

router.post(
  "/login",
  check("username").notEmpty().withMessage("Enter a valid username"),
  check("password").not().isEmpty(),
  Validate,
  Login
);

export default router;
