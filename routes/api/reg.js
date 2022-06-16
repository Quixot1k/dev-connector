import express from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import User from "../../models/User.js";

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Encryptpt password and save user to mongoDB
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
