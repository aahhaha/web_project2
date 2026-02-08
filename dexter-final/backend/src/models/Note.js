const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        killerKey: { type: String, required: true, trim: true },
        text: { type: String, required: true, trim: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
