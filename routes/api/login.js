import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";
import { check, validationResult } from "express-validator";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";

const router = express.Router();

// @route   GET api/login
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User doesn't exists" }] });
      }
      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid password, please check again" }] });
      }
      // Return json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token: token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
