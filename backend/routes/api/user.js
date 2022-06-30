const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Classroom = require("../../models/classroom");

// POST api/users
// Register User route
// Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with more than 6 characters"
    ).isLength({ min: 6 }),
    check("standard", "Class is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("1");
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, standard } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log("2");
      if (user) {
        // See if user exists
        console.log(user);
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        standard,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log("3");
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log("4");
    } catch (err) {
      console.error(err.message);
      console.log("5");
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        // See if user doesnt exists
        // return res
        //   .status(400)
        //   .json({ errors: [{ msg: "Invalid credentials" }] });
        return res.json("No user exist");
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//Get joined classes
router.get("/joinedClasses", auth, async (req, res) => {
  try {
    const c = await User.findOne({ _id: req.user.id });
    console.log(c);
    let ar = [];
    for (let i = 0; i < c.classes.length; i++) {
      const classid = c.classes[i];
      const f = await Classroom.findOne({ _id: classid });
      //console.log("Classroom => ", f);
      ar.push(f);
    }

    res.json(ar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
