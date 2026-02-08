const express = require("express");
const path = require("path");

const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const publicPath = path.join(__dirname, "..", "..", "public");
app.use(express.static(publicPath));



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);


app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
