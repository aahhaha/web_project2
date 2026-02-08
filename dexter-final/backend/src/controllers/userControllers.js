const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getProfile(req, res) {
    const user = await User.findById(req.user.id).select("_id username email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
        id: user._id,
        username: user.username,
        email: user.email
    });
}

async function updateProfile(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: "username and email are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username.trim();
    user.email = email.toLowerCase().trim();

    if (password && password.trim().length > 0) {
        user.passwordHash = await bcrypt.hash(password.trim(), 10);
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });

    if (existing && existing._id.toString() !== req.user.id) {
        return res.status(409).json({ message: "Email is already in use" });
    }

    await user.save();

    res.json({
        message: "Profile updated",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = { getProfile, updateProfile };
