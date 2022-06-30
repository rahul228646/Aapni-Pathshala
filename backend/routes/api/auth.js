const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Teacher = require("../../models/teacher");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("user ",user);
    if(!user)
    {
      const teacher = await Teacher.findById(req.user.id).select("-password");
      console.log("teacher ",teacher);
      return res.json(teacher);
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("Server errror");
  }
});

module.exports = router;
