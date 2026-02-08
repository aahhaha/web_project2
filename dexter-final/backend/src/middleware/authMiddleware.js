const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if(!header) {
        return res.status(401).json({
            message: "No authorization header",
        });
    }

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Invalid authorization header",
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    }
    catch (e) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}
module.exports = authMiddleware;