const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, username,password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User ({ email, username, password: hashedPassword });

    try{
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    }catch(error){
        res.status(500).json({ error: "Error registering User :( " });
    }
});

router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username });

    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "secret_key", { expiresIn: "1h" });
    res.json({ token, message: "Login Successful" });
});

module.exports = router;