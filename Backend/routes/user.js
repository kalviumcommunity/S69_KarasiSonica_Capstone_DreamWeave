const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const auth = require("../middleware/auth"); // ✅ Import the auth middleware

const router = express.Router();

// 🟢 Signup Route
router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;

    const isValidUsername = /^[a-zA-Z0-9]+$/.test(username);
    if (!isValidUsername) {
        return res.status(400).json({ error: "Username should not contain special characters" });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email or username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error registering User :( " });
    }
});

// 🟢 Get All Users (optional)
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// 🟢 Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res
        .cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production
            sameSite: "Lax",
        })
        .json({ message: "Login Successful", username: user.username });
});

// 🟢 Protected Profile Route
router.get("/profile", auth, (req, res) => {
    const { _id, email, username, createdAt } = req.user;
    res.json({ id: _id, email, username, joined: createdAt });
});

// 🟢 Update User
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: "User updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});

// 🟢 Delete User
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

module.exports = router;
