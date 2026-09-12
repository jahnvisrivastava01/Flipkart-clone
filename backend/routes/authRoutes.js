import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import firebaseAdmin, { isFirebaseConfigured } from "../config/firebaseAdmin.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });




// @route POST /api/auth/register
router.post("/register", authLimiter, async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { name, email, password } = result.data;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// @route POST /api/auth/login
router.post("/login", authLimiter, async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// @route  POST /api/auth/google
// Verifies a Firebase ID token from the client (Google Sign-In popup), then
// finds or creates a matching user and returns our own app JWT. Returns a
// clear 501 instead of crashing if Firebase hasn't been configured yet.
router.post("/google", async (req, res) => {
  if (!isFirebaseConfigured) {
    return res.status(501).json({
      message: "Google sign-in isn't set up yet. Add your Firebase credentials to backend/.env.",
    });
  }
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "idToken is required" });

    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decoded;

    if (!email) {
      return res.status(400).json({ message: "Google account has no email" });
    }

    let user = await User.findOne({ $or: [{ googleId: uid }, { email }] });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        googleId: uid,
      });
    } else if (!user.googleId) {
      user.googleId = uid;
      await user.save();
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(401).json({ message: "Google authentication failed" });
  }
});

// @route  GET /api/auth/profile
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// @route  POST /api/auth/address
router.post("/address", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json(user.addresses);
});

export default router;
