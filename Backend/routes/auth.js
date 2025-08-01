const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const router = express.Router();

// Unified Signup/Login Route
router.post("/auth", async (req, res) => {
    const { email, username, password } = req.body;

    // Validate username (no special characters)
    const isValidUsername = /^[a-zA-Z0-9]+$/.test(username);
    if (!isValidUsername) {
        return res.status(400).json({ error: "Username should not contain special characters" });
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {
                return res.status(200).json({
                    message: "Login successful",
                    user: {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email,
                    }
                });
            } else {
                return res.status(401).json({ error: "User already exists but password is incorrect" });
            }
        }

        // New user: proceed to signup
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Optional: get all users (for debugging/testing)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


// Optional: Update user by ID
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (username) {
            const isValid = /^[a-zA-Z0-9]+$/.test(username);
            if (!isValid) return res.status(400).json({ error: "Invalid username" });
            user.username = username;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});


// Optional: Delete user by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

module.exports = router;
