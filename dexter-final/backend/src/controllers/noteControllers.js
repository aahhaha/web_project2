const Note = require("../models/Note");

function cleanKey(v) {
    return String(v || "").trim();
}

function cleanText(v) {
    return String(v || "").trim();
}

async function createNote(req, res) {
    const killerKey = cleanKey(req.body.killerKey);
    const text = cleanText(req.body.text);

    if (!killerKey) return res.status(400).json({ message: "killerKey is required" });
    if (!text) return res.status(400).json({ message: "text is required" });

    const note = await Note.create({
        killerKey,
        text,
        owner: req.user.id
    });

    res.status(201).json({
        message: "Note created",
        note: {
            id: note._id,
            killerKey: note.killerKey,
            text: note.text,
            owner: note.owner,
            createdAt: note.createdAt
        }
    });
}

async function getNotes(req, res) {
    const killerKey = cleanKey(req.query.killerKey);
    if (!killerKey) return res.status(400).json({ message: "killerKey query is required" });

    const notes = await Note.find({ killerKey, owner: req.user.id })
        .sort({ createdAt: -1 })
        .populate("owner", "username email");

    res.json({
        killerKey,
        notes: notes.map((n) => ({
            id: n._id,
            text: n.text,
            createdAt: n.createdAt,
            owner: {
                id: n.owner._id,
                username: n.owner.username,
                email: n.owner.email
            }
        }))
    });
}

async function getNoteById(req, res) {
    const note = await Note.findById(req.params.id).populate("owner", "username email");
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner._id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    res.json({
        id: note._id,
        killerKey: note.killerKey,
        text: note.text,
        createdAt: note.createdAt,
        owner: {
            id: note.owner._id,
            username: note.owner.username,
            email: note.owner.email
        }
    });
}

async function updateNote(req, res) {
    const text = cleanText(req.body.text);
    if (!text) return res.status(400).json({ message: "text is required" });

    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    note.text = text;
    await note.save();

    res.json({
        message: "Note updated",
        note: {
            id: note._id,
            killerKey: note.killerKey,
            text: note.text,
            createdAt: note.createdAt
        }
    });
}

async function deleteNote(req, res) {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    await Note.deleteOne({ _id: note._id });

    res.json({ message: "Note deleted" });
}

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };
