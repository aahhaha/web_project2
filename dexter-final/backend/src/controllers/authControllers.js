const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function isEmailValid(email) {
    return typeof email === "string" && email.includes("@") && email.includes(".");
}

async function register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, password are required" });
    }

    if (typeof username !== "string" || username.trim().length < 2) {
        return res.status(400).json({ message: "Username must be at least 2 characters" });
    }

    if (!isEmailValid(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
        return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        passwordHash
    });

    const token = signToken(user._id);

    res.status(201).json({
        message: "Registered",
        token,
        user: { id: user._id, username: user.username, email: user.email }
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (!isEmailValid(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);

    res.json({
        message: "Logged in",
        token,
        user: { id: user._id, username: user.username, email: user.email }
    });
}

module.exports = { register, login };
