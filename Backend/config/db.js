require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MongoDB connection string is missing! Check your .env file.");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI) // No need for deprecated options
    .then(() => console.log("MongoDB Connected :)"))
    .catch((err) => {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1);
    });

module.exports = mongoose;
