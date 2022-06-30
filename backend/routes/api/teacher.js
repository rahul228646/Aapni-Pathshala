const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");

const Teacher = require("../../models/teacher");
const Classroom = require('../../models/classroom');

// POST api/teachers
// Register Teacher route
// Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with more than 6 characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password} = req.body;

    try {
      let user = await Teacher.findOne({ email });

      if (user) {
        // See if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new Teacher({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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


// POST api/auth
// Authenticate teacher and get token route
// Public
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
      let user = await Teacher.findOne({ email });

      if (!user) {
        // See if user doesnt exists
        return res.json("No teacher exist");
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

router.get("/myClassrooms",auth,async(req,res)=>{
  try {
    const myclass=await Classroom.find({teacher:req.user.id});
    res.json(myclass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports = router;
