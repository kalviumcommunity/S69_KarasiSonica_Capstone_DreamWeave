const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const router = express.Router();

router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;